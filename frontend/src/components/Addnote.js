import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


 const Addnote =(props)=> {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        //here e refers to event
        //preventDefault () used to prevent some event to happen by default
        //like after submitting form page reloading
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Your note is added","success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div className="container">
            <h3>Add New Note</h3>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" >Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" >Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'onChange={onChange} value={note.tag} minLength={3} required />
                </div>
               {/* if we use onclick  in place of onSubmit then validation applied on inputs does'not work */}
                <button type="submit" className="btn btn-primary" >Add Note</button>
            </form>
        </div>
    )
}
export default Addnote;