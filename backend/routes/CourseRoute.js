const express = require('express');
const router = express.Router();
const {createCourse, getCourses, getCouseById, updateCourse, deleteCourse} = require('../controllers/courseController');

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/:id', getCouseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;