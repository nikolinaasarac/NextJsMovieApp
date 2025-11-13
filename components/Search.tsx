import {useEffect, useState} from "react";

interface Props {
    onSearch: (term: string) => void;
}

export default function Search({onSearch}: Props) {
    const [input, setInput] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch(input);
        }, 1000); // debounce 1s

        return () => clearTimeout(handler);
    }, [input, onSearch]);

    return (
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search movies or TV shows..."
            className="m-2 mr-2 w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}