import api from '../api'
import {takeLatest, put, call} from 'redux-saga/effects'

// actionTypes 
const LOAD_MOVIES_ASYNC = 'LOAD_MOVIES_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';

const initialState = {
    data: null,
    loading: false,
    error: null
};

// Reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_MOVIES_ASYNC:
            return {
                ...state,
                loading: true,
                error: null,
                search: null
            };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data !== undefined ? action.data : null,
                error: null
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                data: null
            };
        default:
            return state;
    }
}

// Saga
export function* fetchMoviesSaga(action) {
    const res = yield call(api.fetchMovies, action.search);
    if (res.Response === 'True') {
        yield put({type: LOAD_SUCCESS, data: res.Search});
    } else {
        yield put({type: LOAD_FAILURE, error: res.Error});
    }
}

export function* watchRequest() {
    yield takeLatest(LOAD_MOVIES_ASYNC, fetchMoviesSaga);
}

export function onMovieSearch(movie) {
    return {
        type: LOAD_MOVIES_ASYNC,
        search: movie
    };
}
