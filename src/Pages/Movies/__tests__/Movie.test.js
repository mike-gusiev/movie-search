import React from 'react';
import {shallow} from 'enzyme';

import {Movies} from '../index';
import SearchInput from '../../../Components/SearchInput';

const defaultProps = {
    movies: {
        data : [],
        loading : '',
        error : ''
    },
    history: {},
    location: {
        search: '=lol'
    },
    onAddMovie: jest.fn()
};

const setup = (propsOption) => {
    const props = Object.assign(defaultProps, propsOption);
    const wrapper = shallow(<Movies {...props} />);
    return {
        wrapper,
        props
    };
};

describe('TEST Main page', () => {

    describe('TEST Logic ', () => {

        describe('TEST component did mount', () => {

            test('TEST Should update state when search is not empty.', () => {
                const { wrapper } = setup();
                expect(wrapper.state().value).toBe('lol');
            });

            test('TEST Should call onAddMovie when search is not empty', () => {
                const { props } = setup();
                expect(props.onAddMovie).toBeCalled();
            });

            test('TEST Should not update state when search is empty.', () => {
                const { wrapper } = setup({
                    location: {
                        search: ''
                    }
                });
                expect(wrapper.state().value).toBe('');
            });

        });

        describe('TEST on change method ', () => {

            test('TEST Should change state when entered new search index and try to load movie.', () => {
                const event = {
                    target: { value: 'the-value' }
                };
                const { props, wrapper } = setup();
                wrapper.find(SearchInput).simulate('change', event);
                expect(wrapper.state().value).toBe('the-value');
                expect(props.onAddMovie).toBeCalled();
            });

        });

        describe('TEST rendering ifs', () => {

            test('TEST Should have no spans if search index >= 3 and others are empty.', () => {
                const { wrapper } = setup({
                    location: {
                        search: '=hello'
                    }
                });
                expect(wrapper.find('span')).toHaveLength(0);
            });

            test('TEST Should show span when search index <= 3', () => {
                const { wrapper } = setup({location: {
                        search: ''
                    }
                });
                expect(wrapper.find('span')).toHaveLength(1);
                expect(wrapper.find('span').at(0).text()).toBe('Please enter 3 or more chars');
            });

            test('TEST Should show loading span.', () => {
                const { wrapper } = setup({
                    location: {
                        search: '=hello'
                    },
                    movies: {
                        data : [],
                        loading : 'loading',
                        error : ''
                    }});
                expect(wrapper.find('span')).toHaveLength(1);
                expect(wrapper.find('span').at(0).text()).toBe('Pending');
            });

            test('TEST Should show error span.', () => {
                const { wrapper } = setup({
                    movies: {
                        data : [],
                        loading : '',
                        error : 'error'
                    }
                });
                expect(wrapper.find('span')).toHaveLength(1);
                expect(wrapper.find('span').at(0).text()).toBe('error')
            });

        });
    });

});
