
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            {children}
        </div>
    );
}