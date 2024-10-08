import MovieCard from "./MovieCard";
import './scrollbar.css';
const MovieList = ({ title, movies }) => {
    return (
        <div className="px-6">
            <h1 className="text-3xl py-4 text-white">{title}</h1>
            <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex">
                    {movies && movies.map((movie) => (
                        <MovieCard key={movie.id} posterPath={movie.poster_path} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;