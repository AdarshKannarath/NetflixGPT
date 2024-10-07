import { useSelector } from "react-redux"
import MovieList from "./MovieList"
const GptMovieSuggestions = () => {
  const { moviesNames, moviesResults} = useSelector(store => store.gpt)
  if(!moviesNames) return null
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70">
      <div>
        {moviesNames.map((moviesName,index) => <MovieList key={moviesName} title={moviesName} movies={moviesResults[index]} />)}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions