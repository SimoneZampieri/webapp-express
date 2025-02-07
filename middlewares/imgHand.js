const setImgPath = (req, res, next) => {
  req.imagePath = `${req.protocol}://${req.get("host")}/movies_cover/`;
  next();
};

module.exports = setImgPath;
