import { useDispatch } from "react-redux"
import { API_OPTIONS } from "../util/constants"
import { addNowPlayingMovies } from "../util/moviesSlice"
import { useEffect } from "react"

function useNowPlayingMovies(){
    //fetch movies from tmdb api and update the store
  const dispatch=useDispatch()
  async function getNowPlayingMovies(){
    const data=await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1',
    API_OPTIONS
  )
  const json=await data.json()
  console.log(json.results)
  dispatch(addNowPlayingMovies(json.results))
}
    useEffect(()=>{
        getNowPlayingMovies()
    },[])
}

export default useNowPlayingMovies