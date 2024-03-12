import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 1000
}

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        currentBalance: (state, action) => {
            
            state.balance = action.payload.balance;
        }
        
     }
})

export const {currentBalance} = currencySlice.actions;

export default currencySlice.reducer;