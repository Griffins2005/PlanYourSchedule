const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

const getUserIdFromToken = (authorizationHeader) => {
  if (!authorizationHeader) {
    throw new Error('No token found');
  }

  const token = authorizationHeader.split(' ')[1]; // Get token from "Bearer <token>"
  console.log(token);
  if (!token) {
    throw new Error('No token found');
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.user.id;
};

const getEvents = async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);
  try {
    const events = await Event.find({ user: userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEvent = async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const event = new Event({ ...req.body, user: userId });
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const userId = getUserIdFromToken(req.headers.authorization);
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });
    if (deletedEvent) {
      res.json(deletedEvent);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, addEvent, deleteEvent };