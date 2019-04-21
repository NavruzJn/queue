import {Context} from "koa";

const RouteMethod = "get" | "post" | "patch" | "delete";

const IRoute = {
    path: String,
    method: RouteMethod,
    action: (context: Context) => Promise<void>
};

module.exports = IRoute;


