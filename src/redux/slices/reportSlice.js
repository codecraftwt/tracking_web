import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

const initialState = {
  reports: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  },
};

// Thunk to fetch reports for admin with optional date, page, limit
export const getReportsByAdmin = createAsyncThunk(
  "reports/getReportsByAdmin",
  async ({ date, page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (date) params.date = date;

      const response = await axiosInstance.get("api/reports/admin", {
        params,
      });
      return response.data; // expects { status, data, pagination }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReportsByAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReportsByAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
        state.pagination.page = action.payload.pagination.page;
        state.pagination.limit = action.payload.pagination.limit;
        state.pagination.totalItems = action.payload.pagination.totalItems;
        state.pagination.totalPages = action.payload.pagination.totalPages;
      })
      .addCase(getReportsByAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reports";
      });
  },
});

export const {} = reportSlice.actions;

export default reportSlice.reducer;
