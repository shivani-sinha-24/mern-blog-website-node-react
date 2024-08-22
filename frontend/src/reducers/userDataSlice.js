import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { postReq } from "../services/config";

const initialState = {
    user: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (token, { rejectWithValue }) => {
        try {
            const response = await postReq(`https://mern-blog-website-node-react.vercel.app/user/get-user`, { token });
            console.log("responseresponse",response?.data)
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (values, { rejectWithValue }) => {
        try {
            const response = await postReq("https://mern-blog-website-node-react.vercel.app/user/login", values);
            if (response?.status == 200) {
                // Store user in local storage
                localStorage.setItem("blogUser", JSON.stringify(response?.data?.user));
                toast.success(response?.data?.message);
                return response?.data?.user;
            } else {
                toast.error(response?.data?.err?.message);
                return rejectWithValue(response?.data?.err);
            }
        } catch (error) {
            toast.error("An error occurred while logging in");
            return rejectWithValue(error?.response?.data || "Unknown error");
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user, { rejectWithValue }) => {
      try {
        const response = await postReq("https://mern-blog-website-node-react.vercel.app/user/signup", user);
        if (response.data.user) {
          localStorage.setItem("blogUser", JSON.stringify(response.data.user));
          toast.success("User Registeres Successfully");
          return response.data.user;
        } else {
          return rejectWithValue("Registration failed");
        }
      } catch (error) {
        return rejectWithValue(error.response ? error?.response?.data : error.message);
      }
    }
  );

export const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserData: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = {
                    _id: action.payload._id,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                };
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const { resetUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
