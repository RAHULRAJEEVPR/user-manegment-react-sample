import {createSlice} from "@reduxjs/toolkit"

export const AdminSlice =createSlice({
    name:"admin",
    initialState:{
        userId:"",
        userEmail:"",
        
    },
    reducers:{
        setUserId:(state,action)=>{
            state.userId=action.payload.userId
            state.userEmail=action.payload.userEmail
        }
    }
})

export const {setUserId}=AdminSlice.actions
export default AdminSlice.reducer