const User = require('../model/users');
const {createSecretToken } = require('../util/SecretToken');
const bcrypt= require('bcrypt');

//sgin up middleware
const sginup =async (req , res , next) => {
try {
    const {name , email , password , role , education , skills , resumeLink , expertise} = req.body;


    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }

    const exinstingUser = await User.findOne({email});

    if(exinstingUser) {
        return res.status(400).json({message: 'user already exist'});
    }

    // const hashedPassword = await bcrypt.hash(password , 12);
    // console.log(hashedPassword);

    const userData = { name, email, password: password, role };

    if (role === "student") {

        userData.education = education;
        userData.skills = skills;
        userData.resumeLink = resumeLink;
      } else if (role === "framer") {
        userData.expertise = expertise;
      }


      const newUser = new User(userData);
      await newUser.save();


      const token = createSecretToken(newUser._id);

      return res.status(200).json({
        message: 'user created succesfuly',
        user : {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
        token
      });

}catch(error) {
    console.log(error);
    res.status(500).json({message: 'something went wrong'});
}

}



const login = async (req , res , next) =>{
    try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: "Incorrect email or password" });
        }
    
        const auth = await bcrypt.compare(password.trim(), user.password.trim());
        console.log(auth)

        if (!auth) {
          return res.status(401).json({ message: "Incorrect email or passworddd" });
        }
    
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: true,
        });
    
        res.status(200).json({
          message: "User logged in successfully",
          user: { id: user._id, email: user.email, role: user.role },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }

}








module.exports = {
    sginup, 
    login
}