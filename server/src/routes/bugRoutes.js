// server/src/routes/bugRoutes.js
const express = require('express');
const {
  createBug,
  getAllBugs,
  getBugById,
  updateBug,
  deleteBug,
} = require('../controllers/bugController');

const router = express.Router(); // <--- This initializes the Express Router

router.post('/', createBug);
router.get('/', getAllBugs);
router.get('/:id', getBugById);
router.put('/:id', updateBug);
router.delete('/:id', deleteBug);

module.exports = router; // <--- This exports the router instance