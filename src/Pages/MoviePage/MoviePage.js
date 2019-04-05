import React from 'react';
import PropTypes from 'prop-types';

import './moviePageStyle.css'

const MoviePage = (props) => {
    const { poster, title, year } = props.location.state;
    return (
        <div className="moviePageContainer">
            <div className="moviePageDetails">
                {poster === 'N/A' ? (
                    <img className="moviePagePoster" src="http://www.citypages.com/img/movie-placeholder.gif" alt="placeholder" />
                ) : (
                    <img className="moviePagePoster" src={poster} alt={title} />
                )}
                <div className="moviePageInformation">
                    <h2>{title}</h2>
                    <p>{year}</p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and more recently with desktop publishing software like Aldus PageMaker
                        including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
            <div className="video-container">
            <video
                    className="video"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                poster={poster}
                autoPlay
                controls
            />
            </div>
        </div>
    )
};

export default MoviePage;

MoviePage.propTypes = {
    poster: PropTypes.string
};
