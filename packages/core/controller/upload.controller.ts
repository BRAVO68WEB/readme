import fs from "node:fs";

import type { Context } from "hono";

import { genNewSnowflakeId } from "../utils";

export default class UploadController {
    public async upload(ctx: Context) {
        const { file } = await ctx.req.parseBody() as { file: File };
        let fileName = genNewSnowflakeId() + "-" + file.name;
        fileName = fileName.replaceAll(" ", "");
        const fileWrite = fs.createWriteStream(`./uploads/${fileName}`);
        const chunk = file.stream().getReader();

        // eslint-disable-next-line no-constant-condition
        while(true) {
            const { done, value } = await chunk.read();

            if (done) {
                break;
            }

            fileWrite.write(value);
        }

        return ctx.json({
            status: "OK",
            file: fileName,
        });
    }
}