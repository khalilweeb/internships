const User = require('../model/users');
const mongoose = require('mongoose');

const getAllUsers = async (req, res , next) => {

    const users = await User.find({});
    res.status(200).json(users)

}

const deleteUser = async (req , res , next) => {
        const {id }= req.params;
        console.log('sdadasdasdasdas : ' +  id)
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({message: 'not valid'});
        }

        const user = await User.findOneAndDelete({_id: id});
        if(!user) {
            return res.status(400).json({error: 'no such user'});
        }

        res.status(200).json(user);

}


module.exports = {
    getAllUsers,
    deleteUser
}