const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    flat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flat",
        required: true
    },
},
    {
        versionKey: false,
        timestamps: true
    }
)

const Residents = mongoose.model("residents", residentSchema);

module.exports = Residents