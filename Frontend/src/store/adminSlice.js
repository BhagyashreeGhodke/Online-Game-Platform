import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false
    
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        
        isAdmin: (state) => {
            state.status = true;
            
        }
        
     }
})

export const {isAdmin} = adminSlice.actions;

export default adminSlice.reducer;