import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const token_value = req.headers;
  const token = token_value.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const tokendecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokendecoded) {
      req.userId = tokendecoded.Id;
    } else {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token, authorization denied: " + error.message,
    });
  }
};

export default userAuth;
