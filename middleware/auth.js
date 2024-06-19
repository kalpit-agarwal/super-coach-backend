import jwt from "jsonwebtoken";
import response from "../helpers/response.js";

const auth = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(200)
      .json(response.responseData("Unauthorised", {}, false));
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
  next();
};

export default auth;
