// const jwt = require("jsonwebtoken");

// const authentication = async (req, res, next) => {
//   try {
//     if (req.headers.authorization) {
//       const token = req.headers.authorization.split(" ")[1];
//       console.log(token);

//       // check the token is valid or not
//       let decode = jwt.verify(token, process.env.SECRET_KEY);
//       console.log(decode);
//       if (decode) {
//         req.userID = decode.id;
//         next();
//       }
//     } else {
//       res.json({
//         statusCode: 401,
//         message: "unauthorized",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: "Invalid User" });
//   }
// };

// module.exports = { authentication };

const jwt = require("jsonwebtoken");
const {USER} = require("../models/userSchema")
const secretKey = process.env.SECRET_KEY;

let authentication = async function (req, res, next) {
  console.log("header MEssage", req.headers);
  if (req.headers.authorization) {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    try {
      const decode = await jwt.verify(token, secretKey);
      console.log(decode);
      const rootUser = await USER.findOne({
        _id: decode._id,
        "tokens.token": token,
      });

      if (!rootUser) {
        throw new Error("User Not Found");
      }

      req.token = token;
      req.rootUser = rootUser;
      req.userID = rootUser._id;

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authentication };
