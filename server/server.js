const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URL, { dbName: "keeper", useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connected to mongodb."));

const userSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String },
    image: { type: String },
    visits: { type: String },
    notes: { type: Map }
});
const userModel = mongoose.model("User", userSchema);

// return user notes
app.get("/api/notes", (req, res) => {
    const profile = JSON.parse(req.headers.profile);
    if(!profile) return [];
    userModel.findOne({ id: profile.id }, (err, user) => {
        const notesMap = user.notes;
        const notes = notesMap.get("general");
        return res.json(notes);
    });
});
app.post("/notes/add", (req, res) => {
    const profile = JSON.parse(req.headers.profile);
    const newNote = JSON.parse(req.headers.note);
    const notes = JSON.parse(req.headers.notes).allNotes;
    if(!profile || !newNote) return;
    const notesMap = new Map();
    notes.push(newNote);
    notesMap.set("general", notes);
    userModel.updateOne({ id: profile.id }, { $set : {
        notes: notesMap
    }}, (err) => {if(err){console.log(err)}});
});
app.post("/notes/delete", (req, res) => {
    const profile = JSON.parse(req.headers.profile);
    const id = JSON.parse(req.headers.id).id;
    const notes = JSON.parse(req.headers.notes).allNotes;
    if(!profile) return;
    const notesMap = new Map();
    const newNotes = notes.filter((_noteItem, index) => index !== id);
    notesMap.set("general", newNotes);
    userModel.updateOne({ id: profile.id }, { $set : {
        notes: notesMap
    }}, (err) => {if(err){console.log(err)}});
});

// create and update user
app.get("/user/login", (req, res) => {
    const profile = JSON.parse(req.headers.profile);
    userModel.findOne({ id: profile.googleId }, (err, user) => {
        if(err) res.json({ success: false });
        if(!user){
            const notesMap = new Map();
            notesMap.set("general", [{title:"Title", content:"Content"}]);
            const newUser = new userModel({
                id: profile.googleId,
                name: profile.name,
                email: profile.email,
                image: profile.imageUrl,
                visits: "0",
                notes: notesMap
            });
            return newUser.save( err => {
                if (err) return res.json({ success: false });
                return res.json({ success: true });
            });
        }
        else {
            const visits = user.visits ? user.visits : "0";
            const newUser = {
                id: profile.googleId,
                name: profile.name,
                email: profile.email,
                image: profile.image,
                visits: `${parseInt(visits) + 1}`
            }
            userModel.updateOne({ id: profile.googleId }, { $set : newUser }, (err) => {if(err){console.log(err)}});
            return res.json({ success: true });
        }
    });
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Server Started on PORT : ${port}`));