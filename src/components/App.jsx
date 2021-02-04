import React from "react";
//import ReactDom from "react-dom";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
import Note from "./Note";
//import notes from "../notes";

const App = () => {

    const [notes, setNotes] = React.useState([]);

    function addNote(note) {
        setNotes(prevNotes => {
            if(!note.title) note.title = "Title";
            if(!note.content) note.content = "Content";
            return [ ...prevNotes, note ];
        });
    }

    function deleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea 
                onAdd = {addNote}
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