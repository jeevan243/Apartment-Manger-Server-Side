const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    type: { type: String, required: true },
    block: { type: Number, required: true },
    flatnumber: { type: Number, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }
);

const Flat = mongoose.model("flat", flatSchema);

module.exports = Flat
