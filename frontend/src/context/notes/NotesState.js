import React, { useState } from "react";
import NoteContext from "./noteContext";

//this file use used to avoid state drill
//instead of passing one state varibale to all components 
//we directly use usecontext to get all state variables in those components in which it is required.
const NoteState = (props) => {
  const host = "https://digital-notes-rho.vercel.app";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //GET ALL NOTES
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),

      },

    });
    const json = await response.json();
    setNotes(json);


  }
  //add note
  const addNote = async (title, description, tag) => {
    //API CALL 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log(note);

    setNotes(notes.concat(note));
  }

  //delete note
  const deleteNote = async (id) => {
    //API CALL 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),

      },

    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes);

  }

  //edit note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //EDITING LOGIC
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;