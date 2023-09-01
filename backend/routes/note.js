const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE:1
//get all the notes using get"/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {                             //here i had made a change req.user.id-> req.body.id
                                      //after change all notes start fectching
                                      //again replaced req.user.id, working ,don't know how
       
        const notes = await Note.find({user:req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured");
    }

})

//ROUTE:2
//Add new note using post"/api/notes/addnotes".Login required.
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 4 }),
    body('description', 'description must have atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    //If there are errors(user input wrong email or password means that in format not supported by server)  return bad request and errors

    
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error has occured");
    }
})

//ROUTE:3 Update an existing note using put"/api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //creating new note object to update
    const newNote = {}
    if (title) { newNote.title = title };
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    //Find the note to be updated and update
    let note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404).send("note not found");
    }


    //here user is undefind means it has no value 
    //[working on it]
    //res.json(note.user);It start working ,I don't know how?
     if (note.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
     }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
     res.json({note});
})


//ROUTE:4 Delete an existing note using delete"/api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
   

    //Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404).send("note not found");
    }
   


    //same here user is undefined so workign on it.
     //res.json(note.user);Now it start working I don't know .
    
 //deletion is allowed only if  matched of this note
      if (note.user.toString() != req.user.id) {
          return res.status(401).send("Deletion Not Allowed");
     }
     note=await Note.findByIdAndDelete(req.params.id);
     res.json({"Success":"Note has been deleted",note:note});
})

module.exports = router;