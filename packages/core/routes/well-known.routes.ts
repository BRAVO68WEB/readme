import { Hono } from "hono";

import UploadController from "../controller/webfinger.controller";

const wellknown = new Hono();
const uploadController = new UploadController();

wellknown.get("/webfinger", uploadController.getWebFinger);
wellknown.get("/host-meta", uploadController.getWebFinger);

console.log("↗️, Loaded Well-Known Routes!");

export { wellknown };
