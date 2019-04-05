import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Movie from '../Movie';

import './moviesList.css'

class MoviesList extends Component {

    componentDidUpdate(prevProps) {
        if (this.props.history.location.search !== `?search=${this.props.search}`) {
            if (!this.props.search && prevProps.search) {
                this.props.history.replace('');
            } else if (this.props.search) {
                this.props.history.replace(`?search=${this.props.search}`);
            }
        }
    }

    render() {
        const {items} = this.props;
        return (
            <div className="movies">
                <ul className="movies__list">
                    {items && items.map(movie => (
                        <Movie
                            key={movie.imdbID}
                            title={movie.Title}
                            poster={movie.Poster}
                            year={movie.Year}
                            id={movie.imdbID}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default MoviesList;

MoviesList.propTypes = {
    items: PropTypes.array,
    search: PropTypes.string,
    history: PropTypes.object
};
