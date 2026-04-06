import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect, useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore();
    const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();
    const [isSeeding, setIsSeeding] = useState(false);
    const [seedMessage, setSeedMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    }, [fetchAlbums, fetchSongs, fetchStats]);

    const handleSeedDatabase = async () => {
        try {
            setIsSeeding(true);
            setSeedMessage(null);

            const response = await axios.post("/admin/seed/database");

            setSeedMessage(
                `✅ Database seeded! ${response.data.stats.songsCount} songs and ${response.data.stats.albumsCount} albums created.`,
            );

            // Refresh data
            setTimeout(() => {
                fetchAlbums();
                fetchSongs();
                fetchStats();
            }, 1000);
        } catch (error: any) {
            const errorMsg =
                error.response?.data?.message || "Failed to seed database";
            setSeedMessage(`❌ Error: ${errorMsg}`);
            console.error("Seed error:", error);
        } finally {
            setIsSeeding(false);
        }
    };

    if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
        >
            <Header />

            <DashboardStats />

            {/* Seed Database Section */}
            <div className="mb-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="size-5 text-emerald-500" />
                        <div>
                            <h2 className="font-semibold">Seed Database</h2>
                            <p className="text-sm text-zinc-400">
                                Load default songs and albums
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleSeedDatabase}
                        disabled={isSeeding}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        {isSeeding ? "Seeding..." : "Seed Database"}
                    </Button>
                </div>
                {seedMessage && (
                    <div className="mt-3 p-2 bg-zinc-900 rounded text-sm">
                        {seedMessage}
                    </div>
                )}
            </div>

            <Tabs defaultValue="songs" className="space-y-6">
                <TabsList className="p-1 bg-zinc-800/50">
                    <TabsTrigger
                        value="songs"
                        className="data-[state=active]:bg-zinc-700"
                    >
                        <Music className="mr-2 size-4" />
                        Songs
                    </TabsTrigger>
                    <TabsTrigger
                        value="albums"
                        className="data-[state=active]:bg-zinc-700"
                    >
                        <Album className="mr-2 size-4" />
                        Albums
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="songs">
                    <SongsTabContent />
                </TabsContent>
                <TabsContent value="albums">
                    <AlbumsTabContent />
                </TabsContent>
            </Tabs>
        </div>
    );
};
export default AdminPage;
