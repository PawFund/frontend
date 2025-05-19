export default function Main({ children }: { children: React.ReactNode }) {
    return (
        <main className="max-w-7xl mx-auto px-4 lg:px-8">
            {children}
        </main>
    );
}