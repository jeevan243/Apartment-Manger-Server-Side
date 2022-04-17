const express = require("express");
const Flat = require("../models/flats.model");

const router = express.Router();

// console.log("jeevan")


router.post("/", async (req, res) => {
    try {
        const flat = await Flat.create(req.body);
        return res.status(200).send(flat)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

router.get("/", async (req, res) => {
    try {
        const flats = await Flat.find().lean().exec();
        return res.status(201).send(flats)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

router.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        const flat = await Flat.findById(req.params.id);
        return res.status(201).send(flat)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const flat = await Flat.findByIdAndDelete(req.params.id);
        return res.send(flat)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

module.exports = router;