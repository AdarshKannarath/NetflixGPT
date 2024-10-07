import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { BG_IMG_URL } from '../util/constants';
const GptSearchPage = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="fixed inset-0">
        <img
          src={BG_IMG_URL}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  )
}

export default GptSearchPage;