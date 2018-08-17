/**
 * Screen that contains a horizontal list of feeds.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { View, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation';

type Props = {
    componentId: string
}

export default class FeedsScreen extends PureComponent<Props> {

    static get options() {
        return {
            topBar: {
                visible: false,
            }
        };
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity
                    onPress={() => {
                        Navigation.push(this.props.componentId, {
                            component: {
                                name: "msn.CardsScreen",
                            }
                        })
                    }}>
                    <View style={{width: 100, height: 50, backgroundColor: 'grey'}}/>
                </TouchableOpacity>
            </View>
        )
    }

}