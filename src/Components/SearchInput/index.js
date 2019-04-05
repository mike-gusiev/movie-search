import React from 'react';
import PropTypes from 'prop-types';

import './searchInput.css'

const SearchInput = ({value, onChange}) => (
    <div className="search">
        <input
            placeholder='Enter movie name'
            className="search__input"
            value={value}
            onChange={(e) => onChange(e)}/>
    </div>
);

export default SearchInput;

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};
