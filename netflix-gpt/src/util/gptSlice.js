import { createSlice } from "@reduxjs/toolkit"; 
const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        moviesResults:null,
        moviesNames:null,
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch
        },
        addGptMovieResult:(state,action)=>{
            const {moviesNames,moviesResults}=action.payload
            state.moviesNames=moviesNames
            state.moviesResults=moviesResults
        }
    },
})

export const {toggleGptSearchView,addGptMovieResult}=gptSlice.actions
export default gptSlice.reducer