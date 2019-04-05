import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import './movie.css'

export default class Movie extends Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.ref = React.createRef();
        this.state = {
            shownItems: []
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentDidUpdate() {
        this.debounceViewedMovies(1000);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    checkViewedMovies = (element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.top > 0 && rect.top < window.innerHeight) {
            if (!this.state.shownItems.includes(element.textContent)) {
                this.setState({
                    shownItems: [...this.state.shownItems, element.textContent]
                });
                console.log(`Movie view: ${element.textContent}`);
            }
        }
    }

    debounceViewedMovies(timeout) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.checkViewedMovies(this.ref.current), timeout);
    }

    handleScroll() {
        this.debounceViewedMovies(100);
    }

    render() {
        const {poster, title, year, id} = this.props;
        return (
            <div className="movie" ref={this.ref}>
                <Link to={{pathname: `/movie/${id}`, state: {poster, title, year}}}>
                    <div className="movie__container">
                        {poster === 'N/A' ? (
                            <img src="http://www.citypages.com/img/movie-placeholder.gif" alt="placeholder"/>
                        ) : (
                            <img src={poster} alt={title}/>
                        )}
                        <div className="movie__info">
                            <h2 className="movie__title">{title}</h2>
                            <p className="movie__additional">{year}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

Movie.propTypes = {
    poster: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    id: PropTypes.string
};
