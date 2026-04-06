import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
import {
    seedSongsData,
    seedAlbumsData,
    albumSongMappings,
} from "../seeds/seedData.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading to cloudinary");
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all files" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        // if song belongs to an album, update the album's songs array
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            });
        }
        res.status(201).json(song);
    } catch (error) {
        console.log("Error in createSong", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);

        // if song belongs to an album, update the album's songs array
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id },
            });
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(201).json(album);
    } catch (error) {
        console.log("Error in createAlbum", error);
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        console.log("Error in deleteAlbum", error);
        next(error);
    }
};

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
};

// Seed endpoints
export const seedSongs = async (req, res, next) => {
    try {
        // Clear existing songs
        await Song.deleteMany({});

        // Insert seed songs
        const createdSongs = await Song.insertMany(seedSongsData);

        res.status(201).json({
            message: "Songs seeded successfully",
            count: createdSongs.length,
            songs: createdSongs,
        });
    } catch (error) {
        console.log("Error in seedSongs", error);
        next(error);
    }
};

export const seedAlbums = async (req, res, next) => {
    try {
        // Clear existing albums
        await Album.deleteMany({});

        // Get all songs to link to albums
        const allSongs = await Song.find({});

        if (allSongs.length === 0) {
            return res
                .status(400)
                .json({ message: "No songs found. Please seed songs first." });
        }

        // Create albums with song references
        const albumsToCreate = seedAlbumsData.map((album, index) => ({
            ...album,
            songs: albumSongMappings[index]
                .map((songIndex) => allSongs[songIndex]?._id)
                .filter((id) => id),
        }));

        const createdAlbums = await Album.insertMany(albumsToCreate);

        // Update songs with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albumsToCreate[i].songs;

            await Song.updateMany(
                { _id: { $in: albumSongs } },
                { albumId: album._id },
            );
        }

        res.status(201).json({
            message: "Albums seeded successfully",
            count: createdAlbums.length,
            albums: createdAlbums,
        });
    } catch (error) {
        console.log("Error in seedAlbums", error);
        next(error);
    }
};

export const seedDatabase = async (req, res, next) => {
    try {
        // Clear existing data
        await Album.deleteMany({});
        await Song.deleteMany({});

        // Create songs
        const createdSongs = await Song.insertMany(seedSongsData);

        // Create albums with song references
        const albumsToCreate = seedAlbumsData.map((album, index) => ({
            ...album,
            songs: albumSongMappings[index]
                .map((songIndex) => createdSongs[songIndex]?._id)
                .filter((id) => id),
        }));

        const createdAlbums = await Album.insertMany(albumsToCreate);

        // Update songs with their album references
        for (let i = 0; i < createdAlbums.length; i++) {
            const album = createdAlbums[i];
            const albumSongs = albumsToCreate[i].songs;

            await Song.updateMany(
                { _id: { $in: albumSongs } },
                { albumId: album._id },
            );
        }

        res.status(201).json({
            message: "Database seeded successfully",
            stats: {
                songsCount: createdSongs.length,
                albumsCount: createdAlbums.length,
            },
            albums: createdAlbums,
            songs: createdSongs,
        });
    } catch (error) {
        console.log("Error in seedDatabase", error);
        next(error);
    }
};
