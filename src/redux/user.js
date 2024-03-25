import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  loader: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      console.log("inside redux" , action.payload);
      state.loader = action.payload.loader;
    }
  }
})

export const { setLoader } = userSlice.actions

export default userSlice.reducer