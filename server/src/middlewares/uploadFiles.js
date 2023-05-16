import multer from "multer"
import {join} from "path";
const {pathname} = new URL('../public', import.meta.url)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(pathname, "/images/profiles"))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
export const uploadOneImage = multer({ storage: storage }).single("image")

const storagePosts = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(pathname, "/images/posts"))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

export const uploadOneImagePosts = multer({ storage: storagePosts }).single("image")