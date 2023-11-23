import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./App.css";

interface Video {
  name: string;
  key: string;
}

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  poster_path: string;
  original_title: string;
  release_date: string;
  overview: string;
  genres?: Genre[];
  videos?: { results: Video[] };
}

interface MovieListItemProps {
  movie: Movie;
}

function MovieListItem({ movie }: MovieListItemProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  useEffect(() => {
    axios
      .get<Movie>(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=15ef9e772da6656c75fbd9f1773cb945&append_to_response=videos,genres`
      )
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movie.id]);

  let IMAGEPATH = "http://image.tmdb.org/t/p/w500";
  let imageurl = IMAGEPATH + movie.poster_path;

  let video: string | JSX.Element = "";
  if (
    movieDetails?.videos !== undefined &&
    movieDetails.videos.results !== undefined &&
    movieDetails.videos.results.length > 0
  ) {
    video = (
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => setModalIsOpen(true)}>
        {movieDetails.videos.results[0].name}
      </span>
    );
  }

  const genres =
    movieDetails?.genres &&
    movieDetails.genres.map((genre, index) => (
      <span
        key={genre.id}
        className="GenresText"
        style={{ fontSize: "90%", marginRight: "1px" }}>
        {index > 0 && ", "} {genre.name}
      </span>
    ));
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="Movie">
      <img src={imageurl} alt={movie.original_title} />
      <p className="MovieTitle">
        {movie.original_title} : {movie.release_date}
      </p>
      <p className="MovieText">{movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span>
      <br />
      <span className="VideosText">Video: {video}</span>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Movie Video Modal"
        style={{
          content: {
            width: "70%",
            height: "70%",
            margin: "auto",
          },
        }}>
        {movieDetails?.videos &&
        movieDetails.videos.results &&
        movieDetails.videos.results.length > 0 ? (
          <iframe
            title={movieDetails.videos.results[0].name}
            width="100%"
            height="98%"
            src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
            frameBorder="0"
            allowFullScreen></iframe>
        ) : (
          <p>No video available</p>
        )}
        <button onClick={closeModal}>Close Video</button>
      </Modal>
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    axios
      .get<{ results: Movie[] }>(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=15ef9e772da6656c75fbd9f1773cb945&append_to_response=videos"
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  } else {
    const movieItems = movies.map((movie, index) => (
      <MovieListItem key={index} movie={movie} />
    ));

    return <div style={{ flex: 1, padding: 20 }}>{movieItems}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <MovieList />
    </div>
  );
}

export default App;
