'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HostType = new Schema({
    _id: Schema.Types.ObjectId,
    type:{ type: String },
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

HostType.pre('save', function(next){
    this.updated = Date.now();
    next();
});

HostType.statics.findById = function(id){
    return this.findById(id);
};

HostType.statics.findByType = function(type){
    return this.find({type});
};

const model = mongoose.model('HostType', HostType);

module.exports = model;
