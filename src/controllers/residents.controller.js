const express = require("express");
const Residents = require("../models/residents.model");

const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const resident = await Residents.create(req.body);
        return res.status(200).send(resident)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

router.get("/", async (req, res) => {
    try {
        const residents = await Residents.find().lean().exec();
        return res.status(201).send(residents)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const resident = await Residents.findByIdAndDelete(req.params.id);
        return res.send(resident)
    } catch (er) {
        return res.status(500).send(er.message)
    }
})

module.exports = router;