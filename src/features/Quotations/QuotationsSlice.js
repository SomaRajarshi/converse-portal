import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  rfqList: [],
  isLoading: false,
  isError: false,
}

const url = 'http://13.232.221.196:8081/v1/purchase/rfq/'

export const getRfqList = createAsyncThunk(
  'Quotations/getRfqList',
  async (_, thunkApi) => {
    try {
      const resp = await axios.get(url)
      return resp.data
    } catch (error) {
      throw thunkApi.rejectWithValue('Some error happend while fetching data')
    }
  }
)

const quotationsSlice = createSlice({
  name: 'quotations',
  initialState,
  reducers: {},
  extraReducers: {
    [getRfqList.pending]: (state, action) => {
      state.isLoading = true
    },
    [getRfqList.fulfilled]: (state, action) => {
      state.isLoading = false
      state.rfqList = action.payload
      console.log(state.rfqList)
    },
    [getRfqList.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
    },
  },
})

export default quotationsSlice.reducer