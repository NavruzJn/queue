'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Account = new Schema({
    _id: Schema.Types.ObjectId,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    providerId: { type: Schema.Types.ObjectId, ref: 'ProviderType' },
    key: {type: String},
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

Account.pre('save', function(next){
    this.updated = Date.now();
    next();
});

Account.statics.findById = function(id){
    return this.findById(id);
};

Account.statics.findByOwnerId = function(ownerId){
    return this.find({ownerId});
};

Account.statics.findByProviderId = function(providerId){
    return this.find({providerId});
};

const model = mongoose.model('Account', Account);

module.exports = model;
