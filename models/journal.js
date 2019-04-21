'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AccountJournal = new Schema({
    _id: Schema.Types.ObjectId,
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    providerId: { type: Schema.Types.ObjectId, ref: 'ProviderType' },
    action: {type: String},
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

AccountJournal.pre('save', function(next){
    this.updated = Date.now();
    next();
});

AccountJournal.statics.findById = function(id){
    return this.findById(id);
};

AccountJournal.statics.findByOwnerId = function(ownerId){
    return this.find({ownerId});
};

AccountJournal.statics.findByProviderId = function(providerId){
    return this.find({providerId});
};

AccountJournal.statics.findByAction = function(action){
    return this.find({action});
};

const model = mongoose.model('AccountJournal', AccountJournal);

module.exports = model;
