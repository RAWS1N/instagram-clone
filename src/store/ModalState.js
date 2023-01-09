import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name:"modal",
    initialState : {open:false},
    reducers:{
        setOpen(state,action){
            state.open = action.payload
        }
    }
})


export const ModalActions = ModalSlice.actions
export default ModalSlice