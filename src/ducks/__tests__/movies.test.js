import {call, put} from 'redux-saga/effects';

import reducer from '../movies';
import {fetchMoviesSaga, onMovieSearch} from '../movies';

import api from '../../api';

const LOAD_MOVIES_ASYNC = 'LOAD_MOVIES_ASYNC';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAILURE = 'LOAD_FAILURE';

describe('TEST Movies ducks', () => {

    describe('TEST Actions', () => {

        describe('TEST simple actions', () => {

            test('TEST Should create action to search a movie.', () => {
                const movie = 'New movie';
                const expectedAction = {
                    type: LOAD_MOVIES_ASYNC,
                    search: movie
                };
                expect(onMovieSearch(movie)).toEqual(expectedAction);
            });

        });

        describe('TEST async actions', () => {

            test('TEST Should generate success action', () => {
                const action = {search: ''};
                const res = {Response: 'True'};
                const generator = fetchMoviesSaga(action);

                expect(generator.next().value).toEqual(call(api.fetchMovies, action.search));
                expect(generator.next(res).value).toEqual(put(
                    {type: LOAD_SUCCESS, data: undefined}
                ));
            });

            test('TEST Should generate error action.', () => {
                const action = {search: ''};
                const res = {Response: 'other'};
                const generator = fetchMoviesSaga(action);

                expect(generator.next().value).toEqual(call(api.fetchMovies, action.search));
                expect(generator.next(res).value).toEqual(put(
                    {type: LOAD_FAILURE, error: undefined}
                ));
            });
        });
    });

    describe('TEST reducer ', () => {

        describe('TEST reducer action processing ', () => {

            test('TEST Should create empty reducer with initial state.', () => {
                const zeroReducer = reducer(undefined, {});
                expect(zeroReducer).toEqual({
                    data: null,
                    loading: false,
                    error: null
                });
            });

            test('TEST Should not change state on loading.', () => {
                const reducerTest = reducer([], {
                    type: LOAD_MOVIES_ASYNC
                });
                expect(reducerTest).toEqual({
                    loading: true,
                    error: null,
                    search: null
                });
            });

            test('TEST Should write null in data when received data is undefined.', () => {
                const reducerTest = reducer([], {
                    type: LOAD_SUCCESS,
                    data: undefined
                });
                expect(reducerTest).toEqual({
                    loading: false,
                    data: null,
                    error: null
                });
            });

            test('TEST Should write data when received data is not undefined.', () => {
                const reducerTest = reducer([], {
                    type: LOAD_SUCCESS,
                    data: 'movie'
                });
                expect(reducerTest).toEqual({
                    loading: false,
                    data: 'movie',
                    error: null
                });
            });

            test('TEST Should write null data and write error when received an error.', () => {
                const reducerTest = reducer([], {
                    type: LOAD_FAILURE,
                    error: 'error'
                });
                expect(reducerTest).toEqual({
                    loading: false,
                    data: null,
                    error: 'error'
                });
            });

        });

    });

});
