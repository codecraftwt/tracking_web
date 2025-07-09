import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

// Async thunks for API calls
export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ adminId, planId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/payments/create-order", {
        adminId,
        planId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (
    { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/payments/verify-payment",
        {
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          paymentId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPaymentHistory = createAsyncThunk(
  "payment/getHistory",
  async (adminId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/payments/history/${adminId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPaymentHistory = createAsyncThunk(
  "payment/getAllPaymentHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/payments/history");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add-On Payment API calls
export const createAddOnOrder = createAsyncThunk(
  "payment/createAddOnOrder",
  async ({ adminId, addOnPlanId, paymentId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/payments/create-addon-order",
        {
          adminId,
          addOnPlanId,
          paymentId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyAddOnPayment = createAsyncThunk(
  "payment/verifyAddOnPayment",
  async (
    { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/payments/verify-addon-payment",
        {
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          paymentId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Test API call
export const testPaymentAPI = createAsyncThunk(
  "payment/testAPI",
  async (testData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/payments/test", testData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  // Order creation
  orderLoading: false,
  orderError: null,
  orderData: null,

  // Payment verification
  verificationLoading: false,
  verificationError: null,
  verificationData: null,

  // Payment history
  historyLoading: false,
  historyError: null,
  paymentHistory: [],

  allPaymentHistory: [],
  allPaymentHistoryLoading: false,
  allPaymentHistoryError: null,
  totalCompletedAmount: 0,

  // Payment details
  paymentDetailsLoading: false,
  paymentDetailsError: null,
  paymentDetails: null,

  // Add-On Payment states
  addOnOrderLoading: false,
  addOnOrderError: null,
  addOnOrderData: null,

  addOnVerificationLoading: false,
  addOnVerificationError: null,
  addOnVerificationData: null,

  // Test API
  testLoading: false,
  testError: null,
  testData: null,

  // General payment state
  paymentStatus: "idle", // idle, processing, success, failed
  currentPayment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.orderError = null;
      state.verificationError = null;
      state.historyError = null;
      state.paymentDetailsError = null;
      state.testError = null;
      state.paymentStatus = "idle";
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.orderError = null;
    },
    clearVerificationData: (state) => {
      state.verificationData = null;
      state.verificationError = null;
    },
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.paymentStatus = "processing";
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload;
        state.paymentStatus = "failed";
      });

    // Verify Payment
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verificationLoading = false;
        state.verificationData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verificationLoading = false;
        state.verificationError = action.payload;
        state.paymentStatus = "failed";
      });

    // Get Payment History
    builder
      .addCase(getPaymentHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(getPaymentHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.paymentHistory = action.payload.data || [];
      })
      .addCase(getPaymentHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      });

    // Get All Payment History (Admin + Plans Overview)
    builder
      .addCase(getAllPaymentHistory.pending, (state) => {
        state.allPaymentHistoryLoading = true;
        state.allPaymentHistoryError = null;
      })
      .addCase(getAllPaymentHistory.fulfilled, (state, action) => {
        state.allPaymentHistoryLoading = false;
        state.allPaymentHistory = action.payload.data || [];
        state.totalCompletedAmount = action.payload.totalCompletedAmount || 0;
      })
      .addCase(getAllPaymentHistory.rejected, (state, action) => {
        state.allPaymentHistoryLoading = false;
        state.allPaymentHistoryError = action.payload;
      });

    // Get Payment By ID
    builder
      .addCase(getPaymentById.pending, (state) => {
        state.paymentDetailsLoading = true;
        state.paymentDetailsError = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.paymentDetailsLoading = false;
        state.paymentDetails = action.payload.data;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.paymentDetailsLoading = false;
        state.paymentDetailsError = action.payload;
      });

    // Add-On Order creation
    builder
      .addCase(createAddOnOrder.pending, (state) => {
        state.addOnOrderLoading = true;
        state.addOnOrderError = null;
      })
      .addCase(createAddOnOrder.fulfilled, (state, action) => {
        state.addOnOrderLoading = false;
        state.addOnOrderData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(createAddOnOrder.rejected, (state, action) => {
        state.addOnOrderLoading = false;
        state.addOnOrderError = action.payload;
        state.paymentStatus = "failed";
      });

    // Add-On Payment Verification
    builder
      .addCase(verifyAddOnPayment.pending, (state) => {
        state.addOnVerificationLoading = true;
        state.addOnVerificationError = null;
      })
      .addCase(verifyAddOnPayment.fulfilled, (state, action) => {
        state.addOnVerificationLoading = false;
        state.addOnVerificationData = action.payload;
        state.paymentStatus = "success";
      })
      .addCase(verifyAddOnPayment.rejected, (state, action) => {
        state.addOnVerificationLoading = false;
        state.addOnVerificationError = action.payload;
        state.paymentStatus = "failed";
      });

    // Test API
    builder
      .addCase(testPaymentAPI.pending, (state) => {
        state.testLoading = true;
        state.testError = null;
      })
      .addCase(testPaymentAPI.fulfilled, (state, action) => {
        state.testLoading = false;
        state.testData = action.payload;
      })
      .addCase(testPaymentAPI.rejected, (state, action) => {
        state.testLoading = false;
        state.testError = action.payload;
      });
  },
});

export const {
  clearPaymentState,
  setPaymentStatus,
  clearOrderData,
  clearVerificationData,
} = paymentSlice.actions;

export default paymentSlice.reducer;
