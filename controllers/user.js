/**
 * Created by ex90rts on 6/5/16.
 */
'use strict';

import UserModel from "../models/user";

exports.create = async function (ctx, next) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    const newUser = {
        username: username,
        password: password
    };

    const user = await new UserModel(newUser).save();
    ctx.status = 201;
    ctx.body = user;
};

exports.update = async function (ctx, next) {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;

    const newUser = {
        username: username,
        password: password
    };

    const user = await new UserModel(newUser).update(id, newUser);
    ctx.status = 200;
    ctx.body = user;
};

exports.getList = async function (ctx, next) {
    const userList = await new UserModel.find();
    ctx.status = 200;
    ctx.body = userList;
};

exports.delete = async function (ctx, next) {
    const userList = await new UserModel.deleteOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = userList;
};

