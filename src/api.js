import AwesomeDebouncePromise from 'awesome-debounce-promise';

const API = `http://www.omdbapi.com/`;
const API_KEY = 'd2bcf567&s';
const PAGE = '1';

const fetchMovies = (name) => fetch(API + `?apikey=${API_KEY}&s=${name}&page=${PAGE}`).then(movieData => movieData.json());

export default {
    fetchMovies: AwesomeDebouncePromise(fetchMovies, 1000)
};
