const express = require('express');
const {
  getTasks,
  getStats,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // all task routes require login

router.get('/', getTasks);
router.get('/stats', getStats);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
