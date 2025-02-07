const setImgPath = (req, res, next) => {
  req.imagePath = `${req.protocol}://${req.get("host")}`;
  next();
};

module.exports = setImgPath;
