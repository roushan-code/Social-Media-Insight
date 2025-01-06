import express from 'express';
import { addMediaDetails, getMediaDetails, getSingleMediaDetail, getInsight, updateMediaDetail, deleteMediaDetail } from '../controllers/mediaInsight.js';


const router = express.Router();

// complete route -> /api/v1/add-media-details
router.post("/add-media-details", addMediaDetails);

// complete route -> /api/v1/get-media-details
router.get("/get-media-details", getMediaDetails);

// complete route -> /api/v1/media-detail/:id
router.route("/media-detail/:id").get(getSingleMediaDetail).put(updateMediaDetail).delete(deleteMediaDetail);

// complete route -> /api/v1/get-insight
router.post("/get-insight", getInsight);


export default router;

