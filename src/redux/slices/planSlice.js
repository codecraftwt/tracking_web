import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

// Async Thunks
export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/plans/create", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getAllPlans = createAsyncThunk(
  "plan/getAllPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/plans/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const getPlanById = createAsyncThunk(
  "plan/getPlanById",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/plans/${planId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching plan:", error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async ({ planId, updatedPlan }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/plans/update/${planId}`,
        updatedPlan
      );
      return response.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      return rejectWithValue(error.response?.data || "Failed to update plan");
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plan/deletePlan",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/plans/delete/${planId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting plan:", error);
      return rejectWithValue(error.response?.data || "Failed to delete plan");
    }
  }
);

// Slice
const planSlice = createSlice({
  name: "plan",
  initialState: {
    loading: false,
    plansList: [],
    selectedPlan: null,
    error: null,
  },
  reducers: {
    clearPlanStore: (state) => {
      state.plansList = [];
      state.selectedPlan = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all plans
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plansList = action.payload;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get plan by ID
      .addCase(getPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlan = action.payload;
      })
      .addCase(getPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create plan
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plansList.push(action.payload.plan);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update plan
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlan = action.payload.plan;
        const index = state.plansList.findIndex(
          (plan) => plan._id === updatedPlan._id
        );
        if (index !== -1) {
          state.plansList[index] = updatedPlan;
        }
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete plan
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plansList = state.plansList.filter(
          (plan) => plan._id !== action.payload.planId
        );
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPlanStore } = planSlice.actions;

export default planSlice.reducer;
