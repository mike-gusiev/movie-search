import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import SearchInput from '../index';

const defaultProps = {
    value : 'search',
    onChange : jest.fn()
};

const setup = (props = defaultProps) => {
    const wrapper = shallow(<SearchInput {...props} />);
    return {
        wrapper,
        props
    };
};

describe('TEST Search input component ', () => {

    test('TEST Should match the snapshot.', () => {
        const { wrapper } = setup();
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});
