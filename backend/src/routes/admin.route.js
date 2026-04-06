import { Router } from "express";
import {
    checkAdmin,
    createAlbum,
    createSong,
    deleteAlbum,
    deleteSong,
    seedSongs,
    seedAlbums,
    seedDatabase,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

// Seed endpoints
router.post("/seed/songs", seedSongs);
router.post("/seed/albums", seedAlbums);
router.post("/seed/database", seedDatabase);

export default router;
