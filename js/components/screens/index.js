/**
 * Here we register all screens in the react-native-navigation framework.
 */

import { Navigation } from 'react-native-navigation';
import type { Persistor } from 'redux-persist/src/types';
import React, { PureComponent } from "react";
import type { Node } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FeedsScreen from "./FeedsScreen";
import CardsScreen from "./CardsScreen";

export default function registerScreens(persistor: Persistor, store: any) {
    function createWrapper(screen: PureComponent, loading: Node) {
        return () => class extends PureComponent {
            static options = {
                ...screen.options,
            };

            render() {
                return (
                    <PersistGate loading={loading} persistor={persistor}>
                        {React.createElement(screen, this.props)}
                    </PersistGate>
                );
            }
        }
    }

    Navigation.registerComponentWithRedux(
        "msn.FeedsScreen",
        createWrapper(FeedsScreen, null),
        Provider,
        store);
    Navigation.registerComponentWithRedux(
        "msn.CardsScreen",
        createWrapper(CardsScreen, null),
        Provider,
        store);
}