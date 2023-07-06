import Post from "@/components/Posts/Post";

interface PostsProps {
    posts: IPost[];
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <div
            className={
                "grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }
        >
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
