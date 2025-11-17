"use client";
import { useEffect, useState } from "react";

interface Props {
    onSearch: (term: string) => void;
    value: string; // dodaj value iz parent-a
}

export default function Search({ onSearch, value }: Props) {
    const [input, setInput] = useState(value);

    // Sinhronizuj input sa parent state-om kad se promeni tab/URL
    useEffect(() => {
        setInput(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(input);
        }, 1000);

        return () => clearTimeout(handler);
    }, [input, onSearch]);

    return (
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies or TV shows..."
            className="mt-2 w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}