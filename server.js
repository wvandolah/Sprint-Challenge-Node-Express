const express = require('express');
const cors = require('cors');
const actionDb = require('./data/helpers/actionModel')
const projectDb = require('./data/helpers/projectModel')

const server = express();
const port = 5212;

server.use(express.json());
server.use(cors())


const sendUserError = (status, message, res) => {
  res.status(status).json(message);
 }

// #### action CRUD

server.get('/api/action', (req, res) => {
  actionDb.get()
    .then(action => {
      res.json(action)
    })
    .catch( error => {
      sendUserError(500, error, res)
    })
})

server.post('/api/action', (req, res) => {
  const { project_id, description, notes } = req.body;
  if(!project_id || !description){
    sendUserError(400, "project_id and description are required", res)
  }
  actionDb.insert({project_id, description, notes, completed: false })
    .then(action => {
      res.status(201).json(action)
      console.log("this")
    })
    .catch( error => {
      sendUserError(500, "something broke", res)
    })
})



server.listen(port, () => console.log(`server running on port ${port}`))