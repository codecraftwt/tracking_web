import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";
import { toast } from "react-toastify";

// Define the initial state
const initialState = {
  contacts: [],
  contact: {},
  loading: false,
  error: null,
  loadingContact: false,
  errorContact: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalContacts: 0,
  },
};

// Define the thunks
export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/contacts", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContacts = createAsyncThunk(
  "contact/getContacts",
  async ({ page = 1, limit = 10, fromDate, toDate }, { rejectWithValue }) => {
    try {
      const params = { page, limit };
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;

      const response = await axiosInstance.get("/api/contacts", { params });
      return response.data;
    } catch (error) {
      console.log("Error fetching contacts:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContactById = createAsyncThunk(
  "contact/getContactById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/contacts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContactStatus = createAsyncThunk(
  "contact/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/api/contacts/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Define the slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
        toast.success(action.payload.message);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.pagination.page = action.payload.page;
        state.pagination.totalPages = action.payload.totalPages;
        state.pagination.totalContacts = action.payload.totalContacts;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContactById.pending, (state) => {
        state.loadingContact = true;
        state.errorContact = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loadingContact = false;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loadingContact = false;
        state.errorContact = action.payload;
      })
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
        // Update the specific contact in the state
        state.contacts = state.contacts.map((contact) =>
          contact._id === action.payload.contact._id
            ? action.payload.contact
            : contact
        );
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update contact status";
      });
  },
});

// Export the actions and reducer
export const {} = contactSlice.actions;
export default contactSlice.reducer;
