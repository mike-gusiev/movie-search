import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import * as movieDuck from '../../ducks/movies'

import MoviesList from '../../Components/MoviesList'
import SearchInput from '../../Components/SearchInput'

export class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.timer = null;
    }

    componentDidMount() {
        if (this.props.location.search) {
            const value = this.props.location.search.split('=')[1];
            this.setState({value: value});
            this.props.onAddMovie(value);
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({value: value});
        clearTimeout(this.timer);
        this.timer = setTimeout(() => value.length >= 3 && this.props.onAddMovie(value), 300);
    }

    render() {
        return (
            <div className="App">
                <SearchInput value={this.state.value} onChange={this.handleChange.bind(this)}/>
                <div className="status">
                    {this.state.value.length < 3 && <span>Please enter 3 or more chars</span>}
                    {this.props.movies.loading && <span className='pending'>Pending</span>}
                    {this.props.movies.error && this.state.value.length >= 3 && (
                        <span className='error'>{this.props.movies.error}</span>
                    )}
                </div>
                <MoviesList
                    search={this.state.value}
                    items={this.state.value.length >= 3 ? this.props.movies.data : null}
                    history={this.props.history}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        movies: state.movies
    }),
    dispatch => ({
        onAddMovie: (movieName) => dispatch(movieDuck.onMovieSearch(movieName))
    })
)(Movies);

Movies.propTypes = {
    movies: PropTypes.object,
    history: PropTypes.object,
    onAddMovie: PropTypes.func
};
