const express = require('express')
const app = express()
const NoteModel = require('../models/NotesModel');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async(req, res) => {
    // Validate request
    try {
        if(!req.body) {
        return res.status(400).send({

            message: `Note content can not be empty`
        });
        }else{
            //TODO - Write your code here to save the note
            const newNote = new NoteModel(req.body)
            await newNote.save()
            res.status(200).send(newNote)
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    try {
        // Validate request        
    //TODO - Write your code here to returns all note        
        const notes = await NoteModel.find()
        res.status(200).send(notes)        
    } catch (error) {
        res.status(500).send(error)
    }
    
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        if(!req.body) {
        return res.status(400).send({
            message: "id can not be empty"
            });
        }
    //TODO - Write your code here to return onlt one note using noteid
        else{
            const note = await NoteModel.findById(req.params.noteId)
            if (!note) { 
                res.status(404).send("No item found")
            }
            res.status(200).send(note)
        }
    } catch (error) {
        res.send(500).send(error)
    }
    
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    try {
        // Validate request
        if(!req.body) {
        return res.status(400).send({
            message: "note can not be empty"
            });
        }
    //TODO - Write your code here to update note using noteid
        else{
            const updatedNote = await NoteModel.findByIdAndUpdate(req.params.noteId, req.body)
            if (!updatedNote) { 
                res.status(404).send("No item found")
            }
            res.status(200).send(updatedNote)
        }
    } catch (error) {
        res.send(500).send(error)
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    //TODO - Write your code here to delete the note using noteid
    try{
        console.log(req.params.noteId)
        const note = await NoteModel.findByIdAndDelete(req.params.noteId)
        if (!note) { 
            res.status(404).send("No item found")
            console.log("non existant")
            console.log(note)
        }
        res.status(200).send(note)
        console.log(note)
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = app