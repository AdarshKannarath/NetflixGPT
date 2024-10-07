import Header from "./Header"
import useNowPlayingMovies  from "../hooks/useNowPlayingMovies"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
const Browser = () => {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
  useNowPlayingMovies();
  return (
    <div>
    <Header />
    {showGptSearch ? (
      <GptSearchPage />
    ) : (
      <>
        <MainContainer />
        <SecondaryContainer />
      </>
    )}
  </div>
  )
}

export default Browser