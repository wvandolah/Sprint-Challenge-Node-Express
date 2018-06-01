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

server.get('/api/action/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  actionDb.get(id)
    .then(action => {      
      console.log("action")
      res.json(action)
    })    
    .catch( error => {
      // console.log(error)
      sendUserError(500, "error that is not a user", res)
    })
})


// i think i might need to add some logic here to check if project_id is real
server.post('/api/action', (req, res) => {
  const { project_id, description, notes } = req.body;
  if(!project_id || !description){
    sendUserError(400, "project_id and description are required", res)
    return;
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

server.delete('/api/action/:id', (req, res) => {
  const { id } = req.params;
  actionDb.remove(id)
    .then(action => {
      if(action === 0){
        sendUserError(404,"that is not a user",res)
        return;
      }     
      res.json(action)
    })    
    .catch( error => {
      console.log(error)
      sendUserError(500, "something is broken", res)
    })
})

server.put('/api/action/:id', (req, res) => {
  const { project_id, description, notes, completed } = req.body;
  const { id } = req.params;
  // this isn't needed. only the items that are passed in are updated. so this really only stops from sending in blank data.
  if(!project_id || !description){
    sendUserError(400, "project_id and description are required", res)
    return;
  }
  actionDb.update(id, { project_id, description, notes, completed })
    .then(action => {
      res.json(action)
    })
    .catch( error => {
      console.log(error)
      sendUserError(500, "something is broken", res)
    })
})



// ##### project Crud

server.get('/api/project', (req, res) => {
  projectDb.get()
    .then(action => {
      res.json(action)
    })
    .catch( error => {
      sendUserError(500, error, res)
    })
})

server.get('/api/project/:id', (req, res) => {
  const { id } = req.params;
  projectDb.get(id)
    .then(action => {      
      res.json(action)
    })    
    .catch( error => {
      sendUserError(500, "error that is not a user", res)
    })
})

server.post('/api/project', (req, res) => {
  const { description, name } = req.body;
  if(!name || !description){
    sendUserError(400, "name and description are required", res)
    return;
  }
  projectDb.insert({name, description, completed: false })
    .then(action => {
      res.status(201).json(action)
      console.log("this")
    })
    .catch( error => {
      sendUserError(500, "something broke", res)
    })
})

server.delete('/api/project/:id', (req, res) => {
  const { id } = req.params;
  projectDb.remove(id)
    .then(action => {
      if(action === 0){
        sendUserError(404,"that is not a user",res)
        return;
      }     
      res.json(action)
    })    
    .catch( error => {
      console.log(error)
      sendUserError(500, "something is broken", res)
    })
})

server.put('/api/project/:id', (req, res) => {
  const { name, description, completed } = req.body;
  const { id } = req.params;
  // this isn't needed. only the items that are passed in are updated. so this really only stops from sending in blank data.
  if(!name || !description){
    sendUserError(400, "name and description are required", res)
    return;
  }
  projectDb.update(id, { name, description, completed })
    .then(action => {
      res.json(action)
    })
    .catch( error => {
      console.log(error)
      sendUserError(500, "something is broken", res)
    })
})

server.listen(port, () => console.log(`server running on port ${port}`))