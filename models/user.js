'use strict';

import crypto from "crypto";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
    _id: Schema.Types.ObjectId,
    username: { type: String},
    password: { type: String, match: /\w+/, index: true },
});

User.path('password').set(function(v){
    let shasum = crypto.createHash('sha1');
    shasum.update(v);
    return shasum.digest('hex');
});

User.pre('save', function(next){
    this.updated = Date.now();
    next();
});

User.statics.findByUsername = function(username){
    return this.findOne({username: username});
};

const model = mongoose.model('User', User);

module.exports = model;
