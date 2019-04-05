import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import Movie from '../index';

const defaultProps = {
    poster: 'http://www.citypages.com/img/movie-placeholder.gif',
    title: 'image placeholder'
};

const setup = (props = defaultProps) => {
    const wrapper = shallow(<Movie {...props} />);
    return {
        wrapper,
        props
    };
};

describe('TEST Movie component ', () => {

    test('TEST Should match the snapshot.', () => {
        const {wrapper} = setup();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});
