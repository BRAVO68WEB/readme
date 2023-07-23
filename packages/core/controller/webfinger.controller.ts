import type { Context } from "hono";

export default class WebFingerController {
    public getWebFinger = (ctx: Context) => {
        try {
            const resource = ctx.req.query("resource");
            let username = resource?.split(":")[1];
            if (username?.includes("@")) {
                username = username.split("@")[0];
            }
            return ctx.json({
                subject: resource,
                links: [
                    {
                        rel: "self",
                        type: "application/activity+json",
                        href: `${process.env.BASE_URL}/users/${username}`,
                    },
                    {
                        rel: "http://webfinger.net/rel/profile-page",
                        type: "text/html",
                        href: `${process.env.BASE_URL}/users/${username}`,
                    },
                    {
                        rel: "http://ostatus.org/schema/1.0/subscribe",
                        template: `${process.env.BASE_URL}`+ "/authorize-follow?acct={uri}"
                    }
                ]
            });
        } catch (error: any) {
            console.log(error);
            return ctx.json({
                success: false,
            });
        }
    };
}