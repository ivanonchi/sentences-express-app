const authenticateKey = (req, res, next) => {
  const api_key = req.header("x-api-key") || req.query.api_key;
  if (api_key === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authenticateKey;
