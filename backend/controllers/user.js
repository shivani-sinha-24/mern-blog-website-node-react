import User from '../models/User.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const saltRounds = 10;

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email|| !password) return res?.status?.(400)?.json({ message: "User name, email and password are required" })
    //  Check for duplicate user in data base
    const duplilcate = await User?.findOne({email:email})?.exec()
    if (duplilcate) return res?.sendStatus?.(409) // Conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt?.hash(password, saltRounds)
        // Store the new user
        const result = await new User({
            fullName: fullName,
            email: email,
            password: hashedPwd
        })
        result.save();
        // generate token
        const token = jwt.sign(
            {
                fullName: fullName,
                email: email,
            },
            process?.env?.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' } 
        );
        res?.status(201)?.json({"message":`New User created: ${result}`,"user": token})
    } catch (error) {
        res?.status(500)?.json({ message: error?.message })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res?.status?.(400)?.json({ message: "User email and password are required" })
    //  Check for user in data base
    const userFound = await User.findOne({ email: email });
    if (!userFound) return res?.sendStatus?.(401) // Unauthorized
    try {
        // evaluate passowrd
        const match = await bcrypt?.compare(password, userFound?.password)
        if(match){
            //generate token
            const token = jwt.sign(
                {
                    name: userFound.fullName,
                    email: userFound.email,
                    password: userFound.password
                },
                process?.env?.ACCESS_TOKEN_SECRET
            );
            res.status(200).send({ message: "User loggedin successfully", user: token, })
        }else{
            return res?.sendStatus?.(401) // Unauthorized
        }
    } catch (error) {
        res?.status(500)?.json({ message: error?.message })
    }
}

const getUser = async (req, res) => {
    const { token } = req.body;
    
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.email) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // Check for user
        const user = await User.findOne({ email: decoded.email });

        if (user) {
            res.status(200).json({
                fullName: user.fullName,
                email: user.email,
                _id: user._id
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.error("Error retrieving user:", err);
        res.status(500).json({ message: "Server error" });
    }
};


export { signup, login, getUser }