const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');


module.exports.register = async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;
        const usrNameCheck = await userModel.findOne({ username });
        if (usrNameCheck)
            return res.json({ msg: "Username Already Used", status: false });

        const emailCheck = await userModel.findOne({ email });
        if (emailCheck)
            return res.json({ msg: 'You Already Registered! Please Login', status: false });

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new userModel({ username, email, password: hashedPassword });
        const newUser = await user.save();
        console.log(newUser);
        user.password = "";
        res.json({ status: true, user: newUser })
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const emailCheck = await userModel.findOne({ email });
        if (!emailCheck)
            return res.json({ status: false, msg: "Invalid Credential" });
        const checkPassword = await bcrypt.compare(password, emailCheck.password);
        if (!checkPassword)
            return res.json({ status: false, msg: "Invalid Credential" });
        const user = await userModel.find({ email });
        console.log(user[0]);
        res.json({ status: true, msg: "login successfull", user: user[0] });
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await userModel.findByIdAndUpdate(userId, { isAvatarImageSet: true, avatarImage });
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    }
    catch (err) {
        next(err);
    }
}

module.exports.getUsers = async (req, res, next) => {
    try {
        const user = await userModel.find({ _id: { $ne: req.params.id } }).select(["email", "avatarImage", "username", "_id"]);
        // console.log(user);
        return res.json(user);
    }
    catch (err) {
        next(err);
        console.log(err.message);
    }
}