import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join("public", "images"),
  filename: function (req, file, cb) {
    const name = path.basename(
      file.originalname,
      path.extname(file.originalname)
    ); // get the name without extension
    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).array("image");

export default upload;
