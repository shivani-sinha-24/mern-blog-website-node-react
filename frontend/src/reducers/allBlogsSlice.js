import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteReq, getReq, postReq, putReq } from "../services/config";
import toast from "react-hot-toast";

const initialState = {
  blogs: [],
  searchQuery: "",
  currentBlog: null,  
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Thunk to fetch a single blog by ID
export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await getReq(`http://localhost:3009/blog/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching the blog.");
    }
  }
);

// Thunk to fetch all blogs
export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getReq('http://localhost:3009/blog');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while fetching all blogs.");
    }
  }
);

// Thunk to update an existing blog
export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ blogId, blogData }, { rejectWithValue }) => {
    try {
      const response = await putReq(`http://localhost:3009/blog/update-blog/${blogId}`, blogData);
      if (response.error) {
        throw response.error;
      }
      toast.success("Blog updated Successfully")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred while updating the blog.");
    }
  }
);

// Thunk to add a comment to a blog
export const addCmnt = createAsyncThunk(
  'blogs/addCmnt',
  async (blogDetail, { rejectWithValue }) => {
    try {
      const response = await postReq('http://localhost:3009/blog/add-comment', blogDetail);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while adding the comment.");
    }
  }
);

// Thunk to delete a blog
export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await deleteReq(`http://localhost:3009/blog/delete-blog/${blogId}`);
      if (response.error) {
        throw response.error;
      }
      toast.success("Blog Deleted Successfully")
      return { blogId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred while deleting the blog.");
    }
  }
);

const allBlogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    resetAllBlogs: (state) => {
      state.blogs = [];
      state.currentBlog = null;
      state.status = 'idle';
      state.error = null;
    },
    setBlog: (state, action) => {
      state.currentBlog = action?.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action?.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = {
          ...action.payload,
          comments: action.payload.comments || [], 
        };
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the specific blog in the blogs array
        const index = state.blogs.findIndex(blog => blog._id === action?.payload?._id);
        if (index !== -1) {
          state.blogs[index] = action?.payload;
        }
        state.currentBlog = action?.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.payload;
      })
      .addCase(addCmnt.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCmnt.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const blog = state.blogs.find(blog => blog._id === action.meta.arg.blogId);
        if (blog) {
          blog.comments = action.payload.comments || []; 
        }
        if (state.currentBlog && state.currentBlog._id === action.meta.arg.blogId) {
          state.currentBlog.comments = action.payload.comments || []; 
        }
      })
      .addCase(addCmnt.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action?.payload;
      });
  },
});

export const { resetAllBlogs, setBlog, setSearchQuery } = allBlogsSlice.actions;

export default allBlogsSlice.reducer;
