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
      return response.data;
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

// Fetch all tracked dates for a user
export const getUserTrackedDates = createAsyncThunk(
  "user/getUserTrackedDates",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/tracks/user/${userId}/tracked-dates`
      );
      return response.data.trackedDates; // returns array of "YYYY-MM-DD" strings
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getActiveUserLocations = createAsyncThunk(
  "user/getActiveUserLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "api/tracks/admin/active-user-locations"
      );
      return response.data.users; // Array of users with latest locations
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch locations"
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to handle reset password API request
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/users/reset-password", {
        oldPassword,
        newPassword,
      });

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Thunk for forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("api/users/forgot-password", {
        email,
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset password link"
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Thunk for forgot password reset
export const forgotPasswordReset = createAsyncThunk(
  "user/forgotPasswordReset",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "api/users/forgot-password-reset",
        { token, newPassword }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
      return rejectWithValue(error?.response?.data || error.message);
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
    totalUsers: null,
    adminList: [],
    userCounts: {},
    userTrackInfo: [],
    error: null,
    trackedDates: [],
    trackedDatesLoading: false,
    trackedDatesError: null,
    activeUserLocations: [],
    activeUserLocationsLoading: false,
    activeUserLocationsError: null,
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordSuccess: false,
    resetPasswordSuccess: false, // New state for tracking successful password reset
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
    setUserInfo: (state, action) => {
      state.userInfo = action.payload; // Set the user info to state (for logged-in user)
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store in localStorage
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

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersList = action.payload.users;
        state.totalUsers = action.payload.userCount;
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
      })

      .addCase(getUserTrackedDates.pending, (state) => {
        state.trackedDatesLoading = true;
        state.trackedDatesError = null;
      })
      .addCase(getUserTrackedDates.fulfilled, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDates = action.payload; // array of dates as strings
      })
      .addCase(getUserTrackedDates.rejected, (state, action) => {
        state.trackedDatesLoading = false;
        state.trackedDatesError = action.payload;
      })

      .addCase(getActiveUserLocations.pending, (state) => {
        state.activeUserLocationsLoading = true;
        state.activeUserLocationsError = null;
      })
      .addCase(getActiveUserLocations.fulfilled, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocations = action.payload;
      })
      .addCase(getActiveUserLocations.rejected, (state, action) => {
        state.activeUserLocationsLoading = false;
        state.activeUserLocationsError = action.payload;
      })

      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSuccess = true;
        toast.success(action.payload.message);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload;
        toast.error(action.payload?.message || "Failed to send reset link");
      })

      // Handle reset password
      .addCase(forgotPasswordReset.pending, (state) => {
        state.loading = true;
        state.forgotPasswordError = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(forgotPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        toast.success(action.payload.message);
      })
      .addCase(forgotPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordError = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
