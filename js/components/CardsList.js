/**
 * Horizontal scrollable list of Cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import PropTypes from 'prop-types'
import CardContainer from "../containers/CardContainer";
import Carousel from "react-native-snap-carousel";
import Globals from "../globals"
import type { Item } from "../reducers/constants";

type Props = {
    items: Item[]
}

export default class CardsList extends PureComponent<Props> {
    render() {
        return (
            <Carousel
                data={this.props.items}
                renderItem={({item}) => <CardContainer id={item.id}/>}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                sliderWidth={Globals.SCREEN_WIDTH}
                itemWidth={Globals.SCREEN_WIDTH}
            />
        )
    }
}