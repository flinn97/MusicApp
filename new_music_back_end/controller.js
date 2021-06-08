const config = require("./auth.config");
const User = require("./users");
const argon2 = require("argon2");
const Student = require("./StudentSchema.js");
var jwt = require("jsonwebtoken");
const Account = require("./AccountSchema");

//controller controls signup, signin, logout functionality
    //sign up user
exports.signup = async (req, res) => {

    //console.log(req.body.name);

    //console.log(req.body.email);
    //console.log(req.body.password);
    //console.log(req.body);
    //make sure arguments got passed through.
    if (!req.body.name || !req.body.email || !req.body.password)
        return res.status(400).send({
            message: "first name, last name, Email and password are required"
        });

    
    
   
    try {
         //  Check to see if Email already exists and if not send a 403 error. A 403
        // error means permission denied.
        const existingUser = await User.findOne({
            email: req.body.email
        });
        if (existingUser) {
          //console.log("u");
            return res.status(403).send({
                message: "email already exists"
            });
        }

       


        // create a new user and save it to the database

        var cryptpass = await argon2.hash(req.body.password);
        
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: cryptpass,
            role: "teacher",
        });
        await user.save((err, user) => {

            if (err) {

                res.status(500).send({ message: err });
                return;
            }
        });
        //create an account with the user as well. Yes it seems redundant but useful for what I'm doing.
        const account = new Account({
            email: req.body.email,
            teacherID: user._id,
            password: cryptpass,
            role: "teacher",
            DoubleAccount: false,

        });
        await account.save();
        const SaveUser = await User.findOne({
            email: req.body.email
        });
        await Account.updateOne({
            email: req.body.email
            }, {
                $push: { account: SaveUser  }
            }
            );
        const AccountSave = await Account.findOne({
            email: req.body.email
        });
        //console.log(AccountSave);


            // create token with jwt.sign and secret key.
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
        //console.log("acount", AccountSave);

            return res.send({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                accessToken: token,
                account: AccountSave,

            });
    }
        catch (error) {
        //console.log(error);
        return res.sendStatus(500);
    }
};

//sign in the user.
exports.signin = async (req, res) => {
    //console.log(req.body.email);
    //console.log(req.body.email);
    //console.log(req.body.password);
    //make sure there are arguements
    if (!req.body.email || !req.body.password)
        return res.sendStatus(400);
    
    try {
        const accounts = await Account.find({
            email: req.body.email
        });
        //for every account that is found in [accounts] sift through. 
        //Check to see if it is first a student that hasn't ever logged in yet  
        //then check to see if it is a student that has logged in more than once or a teacher.
            for (let i = 0; i <= accounts.length; i++) {
                if (accounts[i].password === req.body.password) {
                    //console.log("I get here");
                    var token = jwt.sign({ id: accounts[i].id }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    const role = await Student.find({
                        email: req.body.email,
                    });
                    return res.status(200).send({
                        id: accounts[i]._id,
                        email: accounts[i].email,
                        role: accounts[i].role,
                        name: "jeff",
                        homework: "y",
                        pastFirstTime: accounts[i].pastFirstTime,
                        accessToken: token,
                        account: role,
                    });
                }

                else {
                    let AccountMatch = await argon2.verify(accounts[i].password, req.body.password);
                    if (AccountMatch) {
                        //console.log(account);
                        var token = jwt.sign({ id: accounts[i].id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                        });

                        if (accounts[i].role === "teacher") {
                            //console.log("id", accounts[i]);
                            const role = await User.findOne({
                                email: req.body.email,
                            });
                            //console.log(req.body.email);
                            return res.status(200).send({
                                id: accounts[i]._id,
                                email: accounts[i].email,
                                role: accounts[i].role,
                                name: role.name,
                                //pastFirstTime: account.pastFirstTime,
                                accessToken: token,
                                account: accounts[i],
                                user: role,
                            });
                        }

                        else {
                            const role = await Student.find({
                                email: req.body.email,
                            });
                            return res.status(200).send({
                                id: accounts[i]._id,
                                email: accounts[i].email,
                                role: accounts[i].role,
                                name: "jeff",
                                homework: "y",
                                pastFirstTime: accounts[i].pastFirstTime,
                                accessToken: token,
                                account: role,
                            });
                        }
                    }

                }
            }

    }

    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};
//logout user.
exports.logout = async (req, res) => {
    try {
    req.session = null;
    res.sendStatus(200);
} catch (error) {
    console.log(error);
    return res.sendStatus(500);
}
};