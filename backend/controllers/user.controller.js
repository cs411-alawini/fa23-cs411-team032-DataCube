const e = require('express');
const userModel = require('../models/user.model');
const formatResponse = require('./utils').formatResponse;

const getUser = async (req, res) =>{
    try{
        const user = await userModel.getUser(req.params.id);
        res.send(formatResponse("Successfully get user", user));
    }
    catch(error){
        res.status(404).send(formatResponse("Failed to get the user", error));
    }
}

const login = async (req, res) => {
  // try {
    // Parse the query parameters from the request
    const user = await userModel.authenticate(req.query.username, req.query.password);
    if (user !== -1) {
      res.status(200).send(formatResponse("Successfully check user", user));
    } else {
      res.status(404).send(formatResponse("Failed to check user", error));
    }
  // } catch (error) {
  //   res.status(404).send(formatResponse("Failed", error));
  // }
}

const createUser = async (req, res) => {

  try {
    const newUser = await userModel.createUser(req.body);
    res.status(201).send(formatResponse("Successfully add a new user", newUser));
  } catch (error) {
    console.log(error);
    res.status(500).send(formatResponse("Failed to add a new user", error));
  }
}

const updateUser = async(req, res) => {
    try {
      const user = await userModel.updateUser(req.params.id, req.body);
      res.send(formatResponse("Successfully update the user info", user));
    }
    catch (error) {
      if (error.message == "Name and email are required"){
        res.status(400).send(formatResponse("Name and email are required", error));
      }
      else if (error.message == 'Task not found'){
        res.status(404).send(formatResponse("Failed to update the user, task id not found", error));
      }
      else{
        res.status(500).send(formatResponse("Failed to update the user", error));
      }
      
    }
}

const deleteUser = async(req, res) => {
    try {
      const user = await userModel.deleteUser(req.params.id);
      res.send(formatResponse("Successfully delete the user", user));
    }
    catch (error) {
      res.status(404).send(formatResponse("Failed to delete the user", error));
    }
}

module.exports = {
    getUser,
    login,
    createUser,
    updateUser,
    deleteUser,
}
