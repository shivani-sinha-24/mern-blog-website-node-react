import React, { useState } from 'react';
import './CreateNewBlog.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postReq } from '../../services/config';
import axios from 'axios';

const CreateNewBlog = ({ reload, setReload }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();
  //logged in user data
  const { user } = useSelector(state => state?.userDataReducer);

  const [file, setFile] = useState(null);
  const [blogObj, setBlogObj] = useState({
    userName: user?.fullName,
    UserId: user?._id,
    title: '',
    image: '',
    content: '',
    date: moment().format('MMMM Do YYYY')
  })

  // Handler function for file change
  const changeHandler = (e) => {
    const selectedFile = e.target.files[0];
    formik.setFieldValue("image", e.target.files[0]);  // Update the formik field
    const { name } = e.target;
    setFile(e.target.files[0]);
    setBlogObj({ ...blogObj, [name]: e.target.files[0] });
  };

  // create blog funtion
  const addBlog = async (e) => {
    setReload(false)
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("blogUser")}`,
        "Content-Type": "multipart/form-data",
      }
    }
    await axios.post("https://mern-blog-website-node-react.vercel.app/blog/add-blog", blogObj, config)
    setReload(true)
    setFile('')
    setBlogObj({
      ...blogObj,
      title: "",
      image: "",
      content: ""
    })
    navigate(`../`, { replace: true })
  }

  // Formik setup with validation
  const formik = useFormik({
    initialValues: {
      userName: user?.fullName || '',
      UserId: user?._id || '',
      title: '',
      image: null,
      content: '',
      date: moment().format('MMMM Do YYYY'),
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string().required('Content is required'),
    }),
    onSubmit: async (values) => {
      console.log("function called")
    },
  });

  // handle function  for input change
  const changeHandle = (e) => {
    const { name, value } = e.target;;
    setBlogObj({ ...blogObj, [name]: value });
  }

  return (
    <div className="create-blog-flex my-3 m d-flex justify-content-center">
      <div className="create-blog-form all-side-shadow p-3">
        <form method="post" className="post-form" encType="multipart/form-data" onSubmit={e => {
          formik.handleSubmit(e)
          if (!formik.errors.title && !formik.errors.title) addBlog(e)
        }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label"><h5>Title</h5></label>
            <input
              type="text"
              value={formik.values.title}
              onChange={(e) => {
                formik.handleChange(e)
                changeHandle(e)

              }}
              onBlur={formik.handleBlur}
              name='title'
              className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
              id="title" />
            {formik.touched.title && formik.errors.title ? (
              <div className="invalid-feedback">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label"><h5>Content</h5></label>
            <textarea
              name='content'
              value={formik.values.content}
              onChange={(e) => {
                formik.handleChange(e)
                changeHandle(e)

              }}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.content && formik.errors.content ? 'is-invalid' : ''}`}
              id="content"
              rows="3"
            ></textarea>
            {formik.touched.content && formik.errors.content ? (
              <div className="invalid-feedback">{formik.errors.content}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <input
              type='file'
              name='image'
              onChange={changeHandler}
              className="form-control"
              id="image"
              accept=".png, .jpg, .jpeg" />
          </div>
          <input
            className="form-control"
            type='text'
            defaultValue={new Date()}
            name='date'
            style={{ display: "none" }}
          ></input>
          <button type='submit' className='create-btn btn btn-primary px-3'><h5>Create</h5></button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewBlog;
