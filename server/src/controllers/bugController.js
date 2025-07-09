// server/src/controllers/bugController.js
const Bug = require('../models/Bug');

// Create a new bug
exports.createBug = async (req, res, next) => {
  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};

// Get all bugs
exports.getAllBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find({});
    res.status(200).json(bugs);
  } catch (error) {
    next(error);
  }
};

// Get a single bug by ID
exports.getBugById = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.status(200).json(bug);
  } catch (error) {
    next(error);
  }
};

// Update a bug by ID
exports.updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.status(200).json(bug);
  } catch (error) {
    next(error);
  }
};

// Delete a bug by ID
exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }
    res.status(200).json({ message: 'Bug deleted successfully' });
  } catch (error) {
    next(error);
  }
};