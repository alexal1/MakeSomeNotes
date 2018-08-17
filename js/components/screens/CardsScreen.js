/**
 * Screen that contains horizontal list of cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import CardsListContainer from "../../containers/CardsListContainer";
import { Navigation } from 'react-native-navigation';

type Props = {
    componentId: string
}

export default class CardsScreen extends PureComponent<Props> {

    static get options() {
        return {
            topBar: {
                visible: false
            }
        };
    }

    render() {
        return (
            <CardsListContainer
                finish={() => Navigation.pop(this.props.componentId)}/>
        )
    }

}