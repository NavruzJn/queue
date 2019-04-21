/**
 * Created by ex90rts on 6/5/16.
 */
'use strict';

import AccountModel from "../models/account";

exports.create = async function (ctx, next) {
    const ownerId = ctx.request.body.ownerId;
    const providerId = ctx.request.body.providerId;
    const key = ctx.request.body.key;

    const account = {ownerId, providerId, key};

    const newAccount = await new AccountModel(account).save();
    ctx.status = 201;
    ctx.body = {newAccount};
};

exports.updateSpec = async function (ctx, next) {
    const id = ctx.request.body.id;
    const ownerId = ctx.request.body.ownerId;
    const providerId = ctx.request.body.providerId;
    const key = ctx.request.body.key;

    const account = {ownerId, providerId, key};

    const updatedAccount = await new AccountModel.updateOne(id, account);
    ctx.status = 200;
    ctx.body = updatedAccount;
};

exports.getList = async function (ctx, next) {
    const accountList = await new AccountModel.find();
    ctx.status = 200;
    ctx.body = accountList;
};

exports.delete = async function (ctx, next) {
    const deletedAccount = await new AccountModel.deleteOne(id);
    ctx.status = 200;
    ctx.body = deletedAccount;
};

