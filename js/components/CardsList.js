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

export default class CardsList extends PureComponent {
    render() {
        return (
            <Carousel
                data={this.props.titleIds}
                renderItem={({item}) => <CardContainer id={item}/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                sliderWidth={Globals.SCREEN_WIDTH}
                itemWidth={Globals.SCREEN_WIDTH}
                inactiveSlideOpacity={0.8}
                inactiveSlideScale={0.6}
            />
        )
    }
}

CardsList.propTypes = {
    titleIds: PropTypes.array.isRequired
};