// Shared seed data that can be used by both CLI scripts and API endpoints

export const seedSongsData = [
    {
        title: "City Rain",
        artist: "Urban Echo",
        imageUrl: "/cover-images/7.jpg",
        audioUrl: "/songs/7.mp3",
        plays: 0,
        duration: 39,
    },
    {
        title: "Neon Lights",
        artist: "Night Runners",
        imageUrl: "/cover-images/5.jpg",
        audioUrl: "/songs/5.mp3",
        plays: 0,
        duration: 36,
    },
    {
        title: "Urban Jungle",
        artist: "City Lights",
        imageUrl: "/cover-images/15.jpg",
        audioUrl: "/songs/15.mp3",
        plays: 0,
        duration: 36,
    },
    {
        title: "Neon Dreams",
        artist: "Cyber Pulse",
        imageUrl: "/cover-images/13.jpg",
        audioUrl: "/songs/13.mp3",
        plays: 0,
        duration: 39,
    },
    {
        title: "Summer Daze",
        artist: "Coastal Kids",
        imageUrl: "/cover-images/4.jpg",
        audioUrl: "/songs/4.mp3",
        plays: 0,
        duration: 24,
    },
    {
        title: "Ocean Waves",
        artist: "Coastal Drift",
        imageUrl: "/cover-images/9.jpg",
        audioUrl: "/songs/9.mp3",
        plays: 0,
        duration: 28,
    },
    {
        title: "Crystal Rain",
        artist: "Echo Valley",
        imageUrl: "/cover-images/16.jpg",
        audioUrl: "/songs/16.mp3",
        plays: 0,
        duration: 39,
    },
    {
        title: "Starlight",
        artist: "Luna Bay",
        imageUrl: "/cover-images/10.jpg",
        audioUrl: "/songs/10.mp3",
        plays: 0,
        duration: 30,
    },
    {
        title: "Stay With Me",
        artist: "Sarah Mitchell",
        imageUrl: "/cover-images/1.jpg",
        audioUrl: "/songs/1.mp3",
        plays: 0,
        duration: 46,
    },
    {
        title: "Midnight Drive",
        artist: "The Wanderers",
        imageUrl: "/cover-images/2.jpg",
        audioUrl: "/songs/2.mp3",
        plays: 0,
        duration: 41,
    },
    {
        title: "Moonlight Dance",
        artist: "Silver Shadows",
        imageUrl: "/cover-images/14.jpg",
        audioUrl: "/songs/14.mp3",
        plays: 0,
        duration: 27,
    },
    {
        title: "Lost in Tokyo",
        artist: "Electric Dreams",
        imageUrl: "/cover-images/3.jpg",
        audioUrl: "/songs/3.mp3",
        plays: 0,
        duration: 24,
    },
    {
        title: "Neon Tokyo",
        artist: "Future Pulse",
        imageUrl: "/cover-images/17.jpg",
        audioUrl: "/songs/17.mp3",
        plays: 0,
        duration: 39,
    },
    {
        title: "Purple Sunset",
        artist: "Dream Valley",
        imageUrl: "/cover-images/12.jpg",
        audioUrl: "/songs/12.mp3",
        plays: 0,
        duration: 17,
    },
];

export const seedAlbumsData = [
    {
        title: "Urban Nights",
        artist: "Various Artists",
        imageUrl: "/albums/1.jpg",
        releaseYear: 2024,
    },
    {
        title: "Coastal Dreaming",
        artist: "Various Artists",
        imageUrl: "/albums/2.jpg",
        releaseYear: 2024,
    },
    {
        title: "Midnight Sessions",
        artist: "Various Artists",
        imageUrl: "/albums/3.jpg",
        releaseYear: 2024,
    },
    {
        title: "Eastern Dreams",
        artist: "Various Artists",
        imageUrl: "/albums/4.jpg",
        releaseYear: 2024,
    },
];

// Maps which songs belong to which albums (by index)
export const albumSongMappings = [
    [0, 1, 2, 3], // Urban Nights: songs 0-3
    [4, 5, 6, 7], // Coastal Dreaming: songs 4-7
    [8, 9, 10], // Midnight Sessions: songs 8-10
    [11, 12, 13], // Eastern Dreams: songs 11-13
];
