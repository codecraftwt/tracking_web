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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/contacts");
      return response.data;
    } catch (error) {
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
        state.contacts = action.payload;
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
      });
  },
});

// Export the actions and reducer
export const {} = contactSlice.actions;
export default contactSlice.reducer;
