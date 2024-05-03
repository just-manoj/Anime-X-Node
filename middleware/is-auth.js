const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  const { checkIsAuth } = req.query || {};
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new Error("There is no Token..!");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, "topsecrettokenforanimex");
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      message: "Not Authtendicated...!",
    });
  }

  if (!checkIsAuth) {
    req.userId = decodedToken.userId;
    next();
  } else {
    return res.status(200).json({
      message: "Authtendicated...!",
    });
  }
};
