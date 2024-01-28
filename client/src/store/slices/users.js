import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"UsersSlice",
    initialState:{
        userLoading: false,
        userData: null,
        userError: null,
    },
    reducers:{
        getUserLoading(state,action){
            return{
                ...state,
                userLoading: true, 
            }
        },
        getUserDataSuccess(state,action){
            return{
                ...state,
                userData: null,
            }
        },
        getUserFailure(state,action){
            return{
                ...state,
                userError: null,
            }
        }
    },
})

export const {
    getUserLoading,
    getUserDataSuccess,
    getUserFailure,
} = userSlice.actions;

export default userSlice.reducer;