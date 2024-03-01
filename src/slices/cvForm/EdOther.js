import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    others: []
}

const EdOtherSlice = createSlice({
    name: "edOther/others",
    initialState: initialState,
    reducers: {
        addToOthers : (state,action)=>{
            state.others.push(action.payload)
        }
    }
})

export const {
    addToOthers
} = EdOtherSlice.actions

export default EdOtherSlice.reducer