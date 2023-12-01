const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  console.log(req.headers);

  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("payload", payload);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json("el token no existe o no es valido");
  }
}
module.exports = isTokenValid;
