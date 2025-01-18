const User = require('../model/users');


const getAllUsers = async (req, res , next) => {

    const users = await User.find({});
    res.status(200).json(users)

}


module.exports = {
    getAllUsers
}