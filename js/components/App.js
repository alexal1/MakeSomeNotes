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
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

type Props = {}

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <CardsListContainer />
                </PersistGate>
            </Provider>
        );
    }
}