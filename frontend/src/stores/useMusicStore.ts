import { axiosInstance } from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);

            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id),
            }));
            toast.success("Song deleted successfully");
        } catch (error: any) {
            console.log("Error in deleteSong", error);
            toast.error("Error deleting song");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) =>
                    song.albumId ===
                    state.albums.find((a) => a._id === id)?.title
                        ? { ...song, album: null }
                        : song,
                ),
            }));
            toast.success("Album deleted successfully");
        } catch (error: any) {
            toast.error("Failed to delete album: " + error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs");
            set({ songs: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch songs";
            set({ error: errorMsg, songs: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/stats");
            set({ stats: response.data || { totalSongs: 0, totalAlbums: 0, totalUsers: 0, totalArtists: 0 } });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch stats";
            set({ error: errorMsg, stats: { totalSongs: 0, totalAlbums: 0, totalUsers: 0, totalArtists: 0 } });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch albums";
            set({ error: errorMsg, albums: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch album";
            set({ error: errorMsg, currentAlbum: null });
        } finally {
            set({ isLoading: false });
        }
    },
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch featured songs";
            set({ error: errorMsg, featuredSongs: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({ madeForYouSongs: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch made for you songs";
            set({ error: errorMsg, madeForYouSongs: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({ trendingSongs: Array.isArray(response.data) ? response.data : [] });
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch trending songs";
            set({ error: errorMsg, trendingSongs: [] });
        } finally {
            set({ isLoading: false });
        }
    },
}));
