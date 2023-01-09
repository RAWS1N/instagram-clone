import {createSlice} from '@reduxjs/toolkit'

const UserSlice = createSlice({
    name:"user",
    initialState: {user:""},
    reducers:{
        setUser(state,action){
            state.user = action.payload
        },
        removeUser(state){
            state.user = ""
        }
    }
})



export const userActions = UserSlice.actions
export default UserSlice