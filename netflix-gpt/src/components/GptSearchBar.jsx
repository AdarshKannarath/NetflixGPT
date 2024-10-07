import { useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, GEMINI_KEY } from "../util/constants";
import {useDispatch} from "react-redux"
import { addGptMovieResult } from "../util/gptSlice";
const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch=useDispatch()
async function searchResults(movie) {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
  const json = await data.json()
  return json.results
}

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const gptQuery =
      "Suggest five movies related to: " +
      searchText.current.value +
      ". Please return only movie titles in a comma-separated format.";

    const genAI = new GoogleGenerativeAI(GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(gptQuery);
    const moviesArray = result.response.text().split(",");
    const promiseArray = moviesArray.map((movie) => searchResults(movie.trim()));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({ moviesNames: moviesArray, moviesResults: tmdbResults }));
  } catch (error) {
    console.error("Error generating content:", error);
    alert("The query was blocked due to safety concerns. Please try a different search query.");
  }
}

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 grid grid-cols-12 bg-black p-1 rounded" onSubmit={handleSubmit}>
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-white"
          placeholder="What would you like to watch today?"
        />
        <button
          type="submit"
          className="col-span-3 m-4 py-2 px-4 bg-red-600 text-white rounded"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar;