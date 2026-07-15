// app/features/guestResumeSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GuestResumeState {
  data: any; // shape matches your normal resume schema
}

const initialState: GuestResumeState = {
  data: null,
};

const guestResumeSlice = createSlice({
  name: "guestResume",
  initialState,
  reducers: {
    setGuestResume: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    updateGuestResume: (state, action: PayloadAction<any>) => {
      state.data = { ...state.data, ...action.payload };
    },
    clearGuestResume: (state) => {
      state.data = null;
    },
  },
});

export const { setGuestResume, updateGuestResume, clearGuestResume } = guestResumeSlice.actions;
export default guestResumeSlice.reducer;