import DBClient from "../providers/database-client";
import { genNewSnowflakeId } from "../utils";

export default class PostService {
    private db = DBClient;

    public async createPostS(
        title: string,
        content: string,
        tags: string[],
        author_id: string,
    ) {
        const uid = genNewSnowflakeId();
        this.db.createPost(uid, title, content, tags, author_id);
        return await this.db.getPost(uid);
    }

    public updatePostS(id: string, updateContent: any) {
        return this.db.updatePost(id, updateContent);
    }

    public getPostS(id: string) {
        return this.db.getPost(id);
    }

    public getPostsS() {
        return this.db.getPosts();
    }

    public deletePostS(id: string) {
        return this.db.deletePost(id);
    }
}