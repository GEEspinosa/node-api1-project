// BUILD YOUR SERVER HERE

//imports
const express = require('express');
const Users = require('./users/model');

//call server

const server = express()

//middleware to parse req.body

server.use(express.json())


//CRUD endpoints

server.post('/api/users', async (req, res) => {
    try {
        const {name, bio} = req.body
        const newUser = await Users.insert({name, bio})
        
        if (!name || !bio){
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            res.status(201).json(newUser)
        }     
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the user to the database'
        })
    }
})

server.get('/api/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({
            message: 'The users information could not be retrieved'
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.status(200).json(user)
        }
    } catch(err) {
        res.status(500).json({
            message: 'The user information could not be retrieved'
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const {name, bio} = req.body;
        const updatedUser = await Users.update(req.params.id, {name, bio})
        if (!name || !bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            }) 
        } else {
            if (!updatedUser){
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.status(200).json(updatedUser)
            }
        }
        
    } catch(err) {
        res.status(500).json({
            message: 'The user information could not be modified'
        })
    }
})


server.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await Users.remove(id)
        if(!deletedUser){
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else{
            res.status(200).json(deletedUser)
        }
    } catch(err) {
        res.status(500).json({
            message: 'The user could not be removed'
        }) 
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
