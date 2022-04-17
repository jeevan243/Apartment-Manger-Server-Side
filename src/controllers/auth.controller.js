//dotenv package to hide the secret key
// const express = require("express")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

const newToken = (user) => {
    // console.log(process.env)
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}
const getUsers = async (req, res) => {
    try {

        const users = await User.find().lean().exec();
        // console.log(users);
        return res.send(users)
    } catch (error) {
        return res.send(error.message)
    }
}

//register
const register = async (req, res) => {
    try {
        //we will try to find the user with the the email provided
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        //If the user is found then it is an error;
        if (user)
            return res.status(400).send({ message: "Please try with another email" });

        //If the user is not found the we will create the user with the email and the password password
        user = await User.create(req.body);

        //then we will hash the passwrd to make the password more secure => bcryptjs npm package 

        //the we will create the webtoken => jsonwebtoken npm package
        const token = newToken(user);

        return res.send({ user, token });
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

//login
const login = async (req, res) => {
    try {

        //we will try to find the user with the email provided
        const user = await User.findOne({ email: req.body.email });

        //If user is not found then return error
        if (!user) {
            return res.status(400)
                .send({ message: "Please Check your email or password" });
        }
        //if user is found then we will match the passwords
        const match = user.checkPassword(req.body.password)

        if (!match) {
            return res.status(400)
                .send({ message: "Please try another email or password" });
        }
        //If user is found then we will create  then token
        const token = newToken(user);

        return res.send({ user, token });

        //then return the user and the token    
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { register, login, getUsers }