const router = require('express').Router();
// const {
//   getVideos,
//   getSingleVideo,
//   createVideo,
//   updateVideo,
//   deleteVideo,
//   addVideoResponse,
//   removeVideoResponse,
// } = require('../../controllers/videoController');

// /api/videos
router
    .route('/')
    .get((req, res) => {


    })
    .post((req, res) => {


    });

// /api/videos/:videoId
router
  .route('/:videoId')
  .get((req, res) => {


    })
  .put((req, res) => {


    })
  .delete((req, res) => {


    });

// /api/videos/:videoId/responses
router
    .route('/:videoId/responses')
    .post((req, res) => {


    });

// /api/videos/:videoId/responses/:responseId
router
    .route('/:videoId/responses/:responseId')
    .delete((req, res) => {


    });

module.exports = router;
