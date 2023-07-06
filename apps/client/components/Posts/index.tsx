import React from "react";

interface PostsProps {}

const Posts = (props: PostsProps) => {
    return (
        <div
            className={
                "grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }
        >
            <div className="post flex aspect-square w-full flex-col justify-between rounded-xl bg-yellow-300 p-6">
                <h2 className={"text-5xl font-bold"}>How I Deployed on Vercel</h2>
                <div className="flex w-full items-baseline justify-between">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className={
                            "h-10 w-10 overflow-hidden rounded-full object-cover object-center"
                        }
                        alt=""
                    />
                    <p className={"text-xl font-bold"}>on 23/4/2056</p>
                </div>
            </div>
        </div>
    );
};

export default Posts;
