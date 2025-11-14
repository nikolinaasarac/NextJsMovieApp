"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

interface TabSelectorProps {
    activeTab: string;
    searchTerm: string; // dodaj ovo iz parent-a
}

export default function TabSelector({ activeTab, searchTerm }: TabSelectorProps) {
    const router = useRouter();

    const handleTabChange = (tab: string) => {
        // Dodaj searchTerm u URL kad mijenjaš tab
        const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : "";
        router.push(`/${tab}${query}`);
    };

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="shows">Tv Shows</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}