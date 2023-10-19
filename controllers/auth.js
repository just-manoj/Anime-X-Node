exports.postSignUp = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    status: "Account Created",
  });
};

exports.postLogIn = (req, res, next) => {
  res.status(200).json({
    status: "Account LogIn",
  });
};
