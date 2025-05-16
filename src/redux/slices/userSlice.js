import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

// Handle User Login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/users/login", data);
      const user = response?.data?.user;

      if (![1, 2].includes(user?.role_id)) {
        const errorMessage =
          "You do not have the required permissions to log in.";
        toast.error(errorMessage);
        return rejectWithValue({ message: errorMessage });
      }

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(response?.data?.message);

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle User Registration
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`api/users/register`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Handle User Update
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `api/users/updateuser/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch All Users
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/users/alluser/${adminId}`);
      return response.data?.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch Single User by ID
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/users/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `api/users/deleteuser/${userId}`
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserCounts = createAsyncThunk(
  "user/getUserCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/users/user-counts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllAdmins = createAsyncThunk(
  "user/getAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("api/users/alladmins");
      return response.data?.admins;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserTrack = createAsyncThunk(
  "user/trackRecord",
  async ({ id, date = "" }, { rejectWithValue }) => {
    try {
      const url = date
        ? `api/tracks/usertrack/${id}?date=${date}`
        : `api/tracks/usertrack/${id}`;

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("user")) || {},
    usersList: [],
    adminList: [],
    userCounts: {},
    userTrackInfo: [],
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = {};
      state.usersList = [];
      state.adminList = [];
      state.userTrackInfo = [];
      (state.userCounts = {}), (state.error = null);
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserTrack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTrack.fulfilled, (state, action) => {
        state.loading = false;
        state.userTrackInfo = action.payload?.user;
      })
      .addCase(getUserTrack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login complted..", action.payload);
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login Failed..", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // Handle Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList.push(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle User Update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.user;
        const userIndex = state.usersList.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.usersList[userIndex] = updatedUser;
        }
        if (state.userInfo?._id === updatedUser._id) {
          state.userInfo = updatedUser;
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      })

      // Handle Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllAdmins.pending, (state) => {
        state.loadingAdmin = true;
        state.error = null;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.loadingAdmin = false;
        state.adminList = action.payload;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.loadingAdmin = false;
        state.error = action.payload;
      })

      .addCase(getUserCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.userCounts = action.payload.count;
      })
      .addCase(getUserCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = state.usersList.filter(
          (item) => item._id != action.payload.user._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
