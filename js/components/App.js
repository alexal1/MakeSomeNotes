/**
 * Root Component of this app.
 *
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from "react-redux";
import { createStore } from 'redux'
import rootReducer from '../reducers'
import CardsListContainer from "../containers/CardsListContainer";

const store = createStore(rootReducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <CardsListContainer />
            </Provider>
        );
    }
}