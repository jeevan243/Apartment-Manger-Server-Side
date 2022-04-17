const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    type: { type: String, required: true },
    block: { type: String, required: true },
    flatnumber: { type: Number, required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);

const Flat = mongoose.model("flat", flatSchema);

module.exports = Flat
