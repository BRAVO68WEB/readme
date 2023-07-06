import Post from "@/components/Posts/Post";

interface PostsProps {
    posts: IPost[];
}

const Posts = ({ posts }: PostsProps) => {
    return (
        <div className={"grid grid-cols-1 gap-10 p-3 md:grid-cols-2 lg:grid-cols-4 xl:gap-12"}>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Posts;
