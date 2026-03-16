import { createSlice } from "@reduxjs/toolkit";

const filterSlience = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state,action) {
      return action.payload
    }
  }
})


export const {setFilter} = filterSlience.actions
export default filterSlience.reducer
