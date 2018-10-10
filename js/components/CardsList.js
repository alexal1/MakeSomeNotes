/**
 * Horizontal scrollable list of Cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import CardViewContainer from "../containers/CardViewContainer";
import Carousel from "react-native-snap-carousel";
import Globals from "../globals"
import PlusView from "./PlusView";

type CarouselItem = {
    key: string,
    type: string,
    cardId: ?number
}

type Props = {
    cardIds: number[],
    createCard: (text: ?string, image: ?string) => void,
    firstItem: number,
    finish: () => void,
    pageId: number,
    pageTitle: string
}

export default class CardsList extends PureComponent<Props> {
    CAROUSEL_ITEM_CARD = "CAROUSEL_ITEM_CARD";
    CAROUSEL_ITEM_PLUS = "CAROUSEL_ITEM_PLUS";

    obtainData = (cardIds: number[]) => {
        const data = [];
        cardIds.forEach((cardId, i) => {
            data.push({
                key: i.toString(),
                type: this.CAROUSEL_ITEM_CARD,
                cardId: cardId
            })
        });
        data.push({
            key: cardIds.length.toString(),
            type: this.CAROUSEL_ITEM_PLUS
        });
        return data
    };

    renderItem = (item: CarouselItem) => {
        switch (item.type) {
            case this.CAROUSEL_ITEM_CARD: {
                return <CardViewContainer
                    cardId={item.cardId}
                    finish={this.props.finish}
                    pageId={this.props.pageId}/>
            }

            case this.CAROUSEL_ITEM_PLUS: {
                return <PlusView
                    createCard={this.props.createCard}
                    pageTitle={this.props.pageTitle}
                    finish={this.props.finish}/>
            }
        }
    };

    render() {
        return (
            <Carousel
                data={this.obtainData(this.props.cardIds)}
                renderItem={({item}) => this.renderItem(item)}
                horizontal={true}
                sliderWidth={Globals.SCREEN_WIDTH}
                itemWidth={Globals.SCREEN_WIDTH}
                inactiveSlideScale={1.0}
                firstItem={this.props.firstItem}
                loop={true}
            />
        )
    }
}