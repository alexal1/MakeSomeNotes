/**
 * Screen that contains a horizontal list of feeds.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Navigation } from 'react-native-navigation';
import ChatsListContainer from "../../containers/ChatsListContainer";

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
            <ChatsListContainer
                openCard={(cardId: number) => {
                    Navigation.push(this.props.componentId, {
                        component: {
                            name: "msn.CardsScreen",
                            passProps: {
                                currentCardId: cardId
                            }
                        }
                    })
                }}
            />
        )
    }

}