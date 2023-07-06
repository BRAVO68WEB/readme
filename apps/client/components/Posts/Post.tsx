interface PostProps {
    post: IPost;
}

const Post = ({ post }: PostProps) => {
    return (
        <div className="post flex aspect-square w-full flex-col justify-between rounded-xl bg-yellow-300 p-6">
            <h2 className={"text-5xl font-bold"}>{post.title}</h2>
            <div className="flex w-full items-baseline justify-between">
                <img
                    src={post.img}
                    className={"h-10 w-10 overflow-hidden rounded-full object-cover object-center"}
                    alt=""
                />
                <p className={"text-xl font-bold"}>on {post.date}</p>
            </div>
        </div>
    );
};

export default Post;
