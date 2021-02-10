import React, {useEffect, useState} from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {

    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    const [isExpanded, setExpanded] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;
        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            }
        });
    }
    function askLogin() {

    }
    function submitNote(event) {
        props.addNote(note);
        props.postNote(note);
        setNote({ title: "", content: "" });
        event.preventDefault();
    }
    function expand() {
        setExpanded(true);
    }

    useEffect(() => {
        fetch("/api/notes", {
            method: "GET",
            headers: { "profile": JSON.stringify(props.isLoggedIn) }
        })
        .then(result => result.json())
        .then(notes => notes.forEach(note => props.addNote(note)));
    }, [props.isLoggedIn]);


    return(
        <div>
            <form className="create-note">
                { isExpanded && (
                    <input
                        type = "text"
                        name = "title"
                        onChange = {handleChange}
                        value = {note.title}
                        placeholder = "Title">
                    </input>
                )}
                <textarea
                    name="content"
                    onClick = {expand}
                    onChange = {handleChange}
                    value = {note.content}
                    placeholder = "Take a note..."
                    rows = { isExpanded ? 3 : 1 }>
                </textarea>
                <Zoom in={ isExpanded }>
                    <Fab onClick={props.isLoggedIn ? submitNote : askLogin}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    )
}

export default CreateArea;