'use strict';

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HostSpecification = new Schema({
    _id: Schema.Types.ObjectId,
    hostId: { type: Schema.Types.ObjectId, ref: 'Host' },
    ram: { type: String },
    cpu: { type: String },
    price: { type: Number },
    created: { type: Date, default: Date.now, index: true },
    updated: { type: Date, default: Date.now, index: true },
});

HostSpecification.pre('save', function(next){
    this.updated = Date.now();
    next();
});

HostSpecification.statics.findById = function(id){
    return this.findById(id);
};

HostSpecification.statics.findByHostId = function(hostId){
    return this.find({hostId});
};

HostSpecification.statics.findByRam = function(ram){
    return this.find({ram});
};

HostSpecification.statics.findByCpu = function(cpu){
    return this.find({cpu});
};

HostSpecification.statics.findByPrice = function(price){
    return this.find({price});
};

const model = mongoose.model('HostSpecification', HostSpecification);

module.exports = model;
