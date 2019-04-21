'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Host = new Schema({
    _id: Schema.Types.ObjectId,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    typeId: { type: Schema.Types.ObjectId, ref: 'HostType' },
    providerTypeId: { type: Schema.Types.ObjectId, ref: 'ProviderType' },
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

Host.pre('save', function(next){
    this.updated = Date.now();
    next();
});

Host.statics.findById = function(id){
    return this.findById(id);
};

Host.statics.findByOwnerId = function(ownerId){
    return this.find({ownerId});
};

Host.statics.findByTypeId = function(typeId){
    return this.find({typeId});
};
Host.statics.findByProviderId = function(providerId){
    return this.find({providerId});
};

const model = mongoose.model('Host', Host);

module.exports = model;
