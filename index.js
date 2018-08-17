import { Navigation } from 'react-native-navigation';
import registerScreens from "./js/components/screens";
import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './js/reducers'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { logger } from "redux-logger";

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

registerScreens(persistor, store);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: "msn.FeedsScreen"
                        }
                    }
                ]
            }
        }
    })
});