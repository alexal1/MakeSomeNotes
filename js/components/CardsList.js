/**
 * Horizontal scrollable list of Cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import CardViewContainer from "../containers/CardViewContainer";
import Carousel from "react-native-snap-carousel";
import Globals from "../globals"

type Props = {
    cardIds: number[]
}

export default class CardsList extends PureComponent<Props> {
    render() {
        return (
            <Carousel
                data={this.props.cardIds}
                renderItem={({item}) => <CardViewContainer cardId={item}/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                sliderWidth={Globals.SCREEN_WIDTH}
                itemWidth={Globals.SCREEN_WIDTH}
            />
        )
    }
}