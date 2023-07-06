import Posts from "@/components/Posts";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="items-center justify-between bg-background p-24">
                <Posts />
            </main>
        </>
    );
}
