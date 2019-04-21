'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProviderType = new Schema({
    _id: Schema.Types.ObjectId,
    type:{ type: String },
    status: {type: Boolean},
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

ProviderType.pre('save', function(next){
    this.updated = Date.now();
    next();
});

ProviderType.statics.findById = function(id){
    return this.findById(id);
};

ProviderType.statics.findByType = function(type){
    return this.find({type});
};

const model = mongoose.model('ProviderType', ProviderType);

module.exports = model;
