/**
 * Screen that contains a horizontal list of feeds.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import ChatViewContainer from "../../containers/ChatViewContainer";
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
            <ChatViewContainer
                openCard={(cardId: number) => {
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: "msn.CardsScreen",
                            passProps: {
                                currentCardId: cardId
                            }
                        }
                    })
                }}/>
        )
    }

}