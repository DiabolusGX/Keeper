import React from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
import Note from "./Note";

const App = () => {

    const [isLoggedIn, setLoggedIn] = React.useState(null);
    const login = (response) => {
        setLoggedIn({
            id: response.profileObj.googleId,
            name: response.profileObj.name,
            email: response.profileObj.email,
            image: response.profileObj.imageUrl
        });
        // database to save user login
        fetch("/user/login", {
            method: "GET",
            headers: { 'profile': JSON.stringify(response.profileObj) }
        });
    }
    const logout = () => {
        setLoggedIn(null);
    }

    const [notes, setNotes] = React.useState([]);
    function addNote(note) {
        setNotes(prevNotes => {
            if(!note.title) note.title = "Title";
            if(!note.content) note.content = "Content";
            return [ ...prevNotes, note ];
        });
    }
    function postNote (note) {
        fetch("/notes/add", {
            method: "POST",
            headers: { "profile": JSON.stringify(isLoggedIn), "note": JSON.stringify(note), "notes": JSON.stringify({allNotes: notes}) }
        });
    }
    function deleteNote(id) {
        setNotes(prevNotes => {
            fetch("/notes/delete", {
                method: "POST",
                headers: { "profile": JSON.stringify(isLoggedIn), "id": JSON.stringify({id: id}), "notes": JSON.stringify({allNotes: prevNotes}) }
            });
            return prevNotes.filter((_noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header
                isLoggedIn = {isLoggedIn}
                login = {login}
                logout = {logout}
            />
            <CreateArea
                addNote = {addNote}
                postNote = {postNote}
                isLoggedIn = {isLoggedIn}
            />
            {notes.map( (noteItem, index) => 
                <Note
                    key = {index}
                    id = {index}
                    title = {noteItem.title}
                    content = {noteItem.content}
                    onDelete = {deleteNote}
                /> 
            )}
            <Footer />
        </div>
    );
}

export default App;