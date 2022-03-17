const router = require('express').Router();

const {
    imageUpload
} = require('../controllers/image');

router.route('/image-upload').post(imageUpload);

module.exports = router;