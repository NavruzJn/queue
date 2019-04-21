/**
 * Created by ex90rts on 6/5/16.
 */
'use strict';

import HostModel from "../models/host";
import HostSpecModel from "../models/hostSpecification";

exports.create = async function (ctx, next) {
    const ownerId = ctx.request.body.ownerId;
    const typeId = ctx.request.body.typeId;
    const providerId = ctx.request.body.providerId;
    const ram = ctx.request.body.ram;
    const cpu = ctx.request.body.cpu;
    const price = ctx.request.body.price;

    const newHost = {ownerId, typeId, providerId};

    const newHostSpec = {hostId: newHost.id, ram, cpu, price};

    const host = await new HostModel(newHost).save();
    const specifications = await new HostSpecModel(newHostSpec).save();
    ctx.status = 201;
    ctx.body = {host, specifications};
};

exports.updateSpec = async function (ctx, next) {
    const hostId = ctx.request.body.hostId;
    const ram = ctx.request.body.ram;
    const cpu = ctx.request.body.cpu;
    const price = ctx.request.body.price;

    const updatedHostSpec = {ram, cpu, price};

    const hostSpec = await new HostSpecModel.updateOne({hostId}, updatedHostSpec);
    ctx.status = 200;
    ctx.body = hostSpec;
};

exports.getList = async function (ctx, next) {
    const hostList = await new HostModel.find();
    ctx.status = 200;
    ctx.body = hostList;
};

exports.delete = async function (ctx, next) {
    const deletedSpec = await new HostSpecModel.deleteOne({hostId: ctx.params.id});
    const deletedHost = await new HostModel.deleteOne(ctx.params.id);
    ctx.status = 200;
    ctx.body = {deletedHost, deletedSpec};
};

