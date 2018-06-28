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
                data={this.props.todoIds}
                renderItem={({item}) => <CardContainer id={item}/>}
                keyExtractor={(item) => item.toString()}
                horizontal={true}
                sliderWidth={Globals.SCREEN_WIDTH}
                itemWidth={Globals.SCREEN_WIDTH}
            />
        )
    }
}

CardsList.propTypes = {
    todoIds: PropTypes.array.isRequired
};