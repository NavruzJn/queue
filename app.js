'use strict';

import Koa from "koa";
import Router from "koa-router";
import logger from "koa-logger";

export const app = new Koa();
const router = new Router();

import * as indexController from "./controllers/index"
import * as userController from "./controllers/user"
import * as hostController from "./controllers/host"
import * as accountController from "./controllers/account"

import tasks from './queue/index';

app.on('error', function(err){
    console.error(err.stack);
    console.log(err.message);
});

router.get('/', indexController.index);
app.use(router.post('/user', userController.create()));
app.use(router.post('/user/:id', userController.update()));
app.use(router.delete('/user/:id', userController.getList()));
app.use(router.post('/host', hostController.create()));
app.use(router.delete('/host/:id', hostController.delete()));
app.use(router.post('/host/hostSpec/:id', hostController.updateSpec()));
app.use(router.post('/account', accountController.create()));
app.use(router.post('/account/:id', accountController.updateSpec()));
app.use(router.delete('/account/:id', accountController.delete()));
app.use(router.post('/task', async (ctx, next) => {
    await tasks.create(ctx.request.body, (err) => {
        if (err) {
            return ctx.body = {
                error: err,
                success: false,
                message: 'Could not implement task',
            }
        } else {
            return ctx.body = {
                error: null,
                success: true,
                message: 'Successfully implemented task',
                body: ctx.request.body
            };
        }
    });
}));

app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
