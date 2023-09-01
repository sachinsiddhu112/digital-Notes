import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const  NoteItem=(props)=> {
    const { note,updateNote } = props;
    const context=useContext(noteContext);
    const {deleteNote}=context;
    return (
        <div className='col-md-3'>

            <div className="card my-3" >

                <div className="card-body">
                    <div className='d-flex align-item-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)} }></i>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                        props.showAlert("Your note is Deleted","success");} }></i>

                    </div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}
export default NoteItem ;