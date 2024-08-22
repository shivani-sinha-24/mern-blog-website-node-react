import React, { useEffect, useState } from 'react';
import './BlogPage.css';
import Comment from '../../components/comment/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { fetchBlogById, addCmnt, setBlog, updateBlog, deleteBlog, fetchAllBlogs } from '../../reducers/allBlogsSlice';

const BlogPage = ({ reload, setReload, isUserLoggedin }) => {
  const { blogId } = useParams();
  const navigate = useNavigate()
  const usereData = useSelector(state => state?.userDataReducer?.user);
  const blog = useSelector(state => state?.allBlogsReducer?.currentBlog);

  console.log("blogblogblogblog",blog)

  const dispatch = useDispatch();

  const [comntInput, setCmntTnput] = useState('');
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogById(blogId));
  }, [blogId, dispatch, reload]);

  const blogDetail = {
    blogId,
    comntInput,
    userName: usereData?.fullName,
    userId: usereData?._id
  };

  const handleAddCmnt = async () => {
    if (comntInput) {
      await dispatch(addCmnt(blogDetail))
      await dispatch(fetchBlogById(blogId));
      setCmntTnput("");
      setReload(true);
    }
  };

  const handleSave = async () => {
    if (blog) {
      await dispatch(updateBlog({ blogId, blogData: blog }));
      setReload(true);
      navigate("/")
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = async () => {
    console.log("delete function called");
    await dispatch(deleteBlog(blogId))
    await dispatch(fetchAllBlogs())
    handleClose()
    navigate("/")
  };

  return (
    <div className="blog d-flex justify-content-center">
      <DeleteConfirmationModal
        show={show} handleClose={handleClose} handleDelete={handleDelete} item={blog}
      />
      <div className="card all-side-shadow">
        <div className="card-header text-center">
          <input
            type="text"
            className="card-title-input"
            value={blog?.title ? blog?.title : ''}
            onChange={(e) => dispatch(setBlog({ ...blog, title: e.target.value }))}
            disabled={!window?.location?.pathname?.includes("edit-blog")}
          />
          <span className="publishe-date">🗓️ Published on {blog?.date ? blog?.date : 'date'}, </span>
          <span className="published-by">  by {blog?.userName ? blog?.userName : 'userName'}</span>
        </div>
        <div className="card-bottom">
          <div className="card-body text-center">
            <div className="text-center">
              {blog?.image && <img src={blog.image} className="card-img-top blog-image" alt="..." />}
            </div>
            <textarea
              className="card-text text-start"
              name="content"
              id="content"
              disabled={!window?.location?.pathname?.includes("edit-blog")}
              value={blog?.content ? blog.content : ''}
              onChange={(e) => dispatch(setBlog({ ...blog, content: e.target.value }))}
            />

            <hr />
            <div className="comnt-form d-flex">
              <div className='cmnt-form-right text-start'>
                <span className='m-2 user-name'>{usereData?.fullName ? usereData.fullName : null}</span>
                <input
                  name="cmntinput"
                  type="text"
                  className="form-control px-3 m-2"
                  placeholder="Add comments...."
                  onChange={(e) => { setCmntTnput(e.target.value) }}
                  value={comntInput}
                />
              </div>
              <div className="cmnt-form-left p-4">
                <button
                  className={`px-4 m-2 btn btn-primary ${!isUserLoggedin ? 'disabled' : null}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddCmnt();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            <hr />
            {blog && blog?.comments && blog?.comments?.map((cmnt, index) =>
              <Comment
                key={index}
                cmntUserId={cmnt.userId}
                userName={cmnt.userName}
                cmnt={cmnt.cmnt}
                setReload={setReload}
                isUserLoggedin={isUserLoggedin}
              />)}
          </div>
          <div className="cmnt-form-left">
            <button
              className={`px-4 m-2 btn btn-primary ${!isUserLoggedin ? 'disabled' : null}`}
              onClick={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              Save
            </button>
            <button
              className={`px-4 m-2 btn btn-danger ${!isUserLoggedin ? 'disabled' : null}`}
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
                // handleAddCmnt();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
