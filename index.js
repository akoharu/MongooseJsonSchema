const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
const fs = require('fs');
const util = require('util');
const logFile = fs.createWriteStream('output.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
const logStdout = process.stdout;

const output = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    server: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
});

const jsonSchema = BookSchema.jsonSchema();

output(jsonSchema)