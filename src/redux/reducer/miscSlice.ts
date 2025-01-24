import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MiscState {
  isDrawer: boolean;
  isMobile:boolean;
  isDashboardDrawer:boolean
}

// Initial state with the defined types
const initialState: MiscState = {
  isDrawer: false,
  isMobile:false,
  isDashboardDrawer:false
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawer = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsDashboardDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDashboardDrawer = action.payload;
    },
  },
});

// Export the entire slice
export default miscSlice; // Export the entire slice

export const {
  setIsDrawer,
  setIsMobile,
  setIsDashboardDrawer
} = miscSlice.actions;
