"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabSelectorProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
    return (
        <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList>
                <TabsTrigger value="movies"  className="cursor-pointer">Movies</TabsTrigger>
                <TabsTrigger value="shows"  className="cursor-pointer">TV Shows</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}