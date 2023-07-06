import Posts from "@/components/Posts";
import Navbar from "@/components/ui/Navbar";

const posts: IPost[] = [
    {
        id: 1,
        title: "How I Deployed on Vercel",
        date: "23/4/2056",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 2,
        title: "How I Deployed on Vercel",
        date: "23/4/2056",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 3,
        title: "How I Deployed on Vercel",
        date: "23/4/2056",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="items-center justify-between bg-background p-8 md:p-16 lg:p-20 xl:p-24">
                <Posts posts={posts} />
            </main>
        </>
    );
}
