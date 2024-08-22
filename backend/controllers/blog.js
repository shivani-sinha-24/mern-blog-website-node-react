import Blog from "../models/Blog.js";
import aws from 'aws-sdk';
import { uploadSingleFile } from '../utils/aws-s3.js';

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.S3_API_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const formS3Params = (file, folder) => ({
  ACL: 'public-read',
  Bucket: process.env.S3_BUCKET_NAME,
  Body: fs.createReadStream(file.path),
  Key: `${folder}/${Date.now()}-${file.originalname}`,
});


// Create an S3 instance
const s3 = new aws.S3();

const addBlog = async (req, res) => {
  const { title, content, date, userId, userName } = req.body;
  let imgFile;
  if (req?.files) {
    // imgFile = req?.files.filename;
    imgFile = req?.files?.image?.name;
  }

  console.log(req?.body,5555555555)
  console.log(req?.files,666666666)
  if (imgFile === undefined && (title == "" || content == "")) {
    //no image no title no
    res.status(401).send({ status: 401, message: "fill the data" });
  } else {
    if (imgFile !== undefined && (title == "" || content == "")) {
      //image but no title or no content
      res.status(401).send({ status: 401, message: "fill the data" });
    } else if (imgFile === undefined && title !== "" && content !== "") {
      // no img but title and content
      const blog = new Blog({
        userName: userName,
        userId: userId,
        title: title,
        content: content,
        date: date,
      });
      blog.save();
      if (blog) {
        res.status(201).send({ status: 201, blog: blog });
      } else {
        console.log("Something wrong when updating data!");
      }
    } else {
      // both image and title
      // Upload the file to AWS S3 using the uploadSingleFile function
      const file = req.files.image; // This should match the name attribute in your HTML form
      const imageUrl = await uploadSingleFile(file, 'image');
      const blog = new Blog({
        userName: userName,
        userId: userId,
        title: title,
        image: imageUrl,
        content: content,
        date: date,
      });
      blog.save();
      if (blog) {
        res.status(201).send({ status: 201, blog: blog });
      } else {
        console.log("Something wrong when updating data!");
      }
    }

  }
}

const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params; 
  let updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (content) {
    updateFields.content = content;
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (blog) {
      res.status(200).send({ status: 200, blog: blog });
    } else {
      res.status(404).send({ status: 404, message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params; // Assuming the blog ID is passed as a URL parameter

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (blog) {
      res.status(200).send({ status: 200, message: "Blog deleted successfully" });
    } else {
      res.status(404).send({ status: 404, message: "Blog not found" });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({ status: 500, message: "Internal server error" });
  }
};

const addCmnt = async (req, res) => {
  const { userId, blogId, comntInput, userName } = req.body;

  const cmntObj = {
    cmnt: comntInput,
    userId: userId,
    userName: userName
  }

  const blog = await Blog.findOneAndUpdate({ _id: blogId }, { $push: { comments: cmntObj } }, { new: true })

  if (blog) {
    res.status(200).send(blog)
  } else {
    console.log("Something wrong when updating data!");
  }
}

const getBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id })
  if (blog) {
    return res?.send(blog)
  } else {
  }
}

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (blogs) {
      return res.status(200).send(blogs.reverse())
    } else {
      return res.status(500).send(err)
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error })
  }
}
export { addBlog, addCmnt, getBlog, getBlogs, updateBlog, deleteBlog }