const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');


const upload = multer({ storage });

// router.get('/', catchAsync(campgrounds.index));
// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campgrounds.createCampground));
    // .post(upload.array('image'), (req, res) => {
    //     console.log(req.body, req.files);
    //     res.send('It worked!');
    // });

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// router.get('/:id', catchAsync(campgrounds.showCampground));
// router.put('/:id', isLoggedIn, isAuthor,catchAsync(campgrounds.updateCampground));
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;