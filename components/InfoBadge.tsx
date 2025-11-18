export function InfoBadge({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-800 text-gray-200 p-3 rounded-lg shadow flex flex-col">
            <span className="text-xs opacity-70">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}