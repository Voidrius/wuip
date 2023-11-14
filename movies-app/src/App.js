import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./App.css";

function MovieListItem(props) {
  const [movie, setMovie] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=15ef9e772da6656c75fbd9f1773cb945&append_to_response=videos,genres`
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, [props.movie.id]);

  let IMAGEPATH = "http://image.tmdb.org/t/p/w500";
  let imageurl = IMAGEPATH + props.movie.poster_path;

  let video = "";
  if (
    movie !== undefined &&
    movie.videos !== undefined &&
    movie.videos.results !== undefined &&
    movie.videos.results.length > 0
  ) {
    video = (
      <span
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => setModalIsOpen(true)}>
        {movie.videos.results[0].name}
      </span>
    );
  }

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const genres =
    movie.genres &&
    movie.genres.map((genre, index) => (
      <span
        key={genre.id}
        className="GenresText"
        style={{ fontSize: "90%", marginRight: "1px" }}>
        {index > 0} {genre.name}
      </span>
    ));

  return (
    <div className="Movie">
      <img src={imageurl} alt={props.movie.original_title} />
      <p className="MovieTitle">
        {props.movie.original_title} : {props.movie.release_date}
      </p>
      <p className="MovieText">{props.movie.overview}</p>
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
        {movie.videos &&
          movie.videos.results &&
          movie.videos.results.length > 0 && (
            <iframe
              title={movie.videos.results[0].name}
              width="100%"
              height="98%"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              frameBorder="0"
              allowFullScreen></iframe>
          )}
        <button onClick={closeModal}>Close Video</button>
      </Modal>
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
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
