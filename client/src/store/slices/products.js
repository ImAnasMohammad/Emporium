import { userDetailsRepo } from "../repositories/user";

import { getUserLoading,
    getUserDataSuccess,
    getUserFailure, } from "../slices/users";

export const userDetails=(params)=>{
    return (dispatch)=>{
        dispatch(getUserLoading(params));
        userDetailsRepo().then((response)=>{
            if(response && response.status == 200){
                dispatch(getUserDataSuccess())
            }
        }).catch((error)=>{
            if(error){
                dispatch(getUserFailure())
            }
        })
    }
}