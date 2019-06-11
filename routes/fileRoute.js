const express = require('express');
const router = express.Router();
const file_upload = require('../app/api/controllers/file_upload');

router.post('/upload', file_upload.upload);
router.get('/files', file_upload.getFilesByUser);

module.exports = router;
