import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "chat",
  initialState: {},
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

export const { setChat } = commonSlice.actions;

export default commonSlice.reducer;
