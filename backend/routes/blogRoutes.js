import express from 'express'
import multer from 'multer';

//import controllers
import { getBlogs, getBlog, addBlog, addCmnt, updateBlog, deleteBlog } from '../controllers/blog.js';
import verifyJWT from '../middleware/verifyJWT.js';

//set storgae path and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.${file.originalname}`);
  },
});

//checking for file filter
const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new Error("only images is allowed"));
};

const upload = multer({ storage, fileFilter });
const router = express.Router()

router.get('/', getBlogs)
router.get('/:id', getBlog)
router.post("/add-comment", verifyJWT, addCmnt)
router.post("/add-blog", verifyJWT, addBlog)
router.put("/update-blog/:id", verifyJWT, updateBlog)
router.delete("/delete-blog/:id", verifyJWT, deleteBlog);


export default router