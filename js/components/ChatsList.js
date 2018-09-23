/**
 * Horizontal scrollable list of Chats.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import Carousel from "react-native-snap-carousel";
import Globals, { scale } from "../globals"
import ChatViewContainer from "../containers/ChatViewContainer";
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
import { colorWhite } from "../resources/colors";
import type { PagesState } from "../reducers/pages";
import { values } from "../globals";

type CarouselItem = {
    key: string
}

type Props = {
    pages: PagesState,
    pageId: number,
    setCurrentPage: (pageId: number) => void,
    openCard: (cardId: number) => void
}

export default class ChatsList extends PureComponent<Props> {

    _header: Text;
    _currentTitle: string;

    _renderItem = (item: CarouselItem) => {
        return (
            <ChatViewContainer
                pageId={item.key}
                openCard={this.props.openCard} />
        )
    };

    _mapIdToItem = (pageId: string): CarouselItem => ({key: pageId});

    _getTitle = (pageId: number) => {
        return this.props.pages[pageId.toString()].title
    };

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.topBar}>
                    <TouchableOpacity>
                        <Image
                            style={styles.menuButton}
                            source={require("../resources/images/ic_menu.png")}/>
                    </TouchableOpacity>
                    <Text style={styles.header}>
                        {this._getTitle(this.props.pageId)}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.actionsButton}>
                            •••
                        </Text>
                    </TouchableOpacity>
                </View>
                <Carousel
                    data={Object.keys(this.props.pages).map(this._mapIdToItem)}
                    renderItem={({item}) => this._renderItem(item)}
                    horizontal={true}
                    sliderWidth={Globals.SCREEN_WIDTH}
                    itemWidth={Globals.SCREEN_WIDTH}
                    inactiveSlideScale={1.0}
                    firstItem={Object.keys(this.props.pages).indexOf(this.props.pageId.toString())}
                    onSnapToItem={(snapIndex) => {
                        const page = values(this.props.pages)[snapIndex];
                        this.props.setCurrentPage(page.id)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colorWhite
    },
    topBar: {
        height: scale(44),
        marginTop: Globals.STATUS_BAR_HEIGHT(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuButton: {
        margin: scale(8),
        opacity: 0.5
    },
    header: {
        margin: scale(8),
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'flex-start'
    },
    actionsButton: {
        margin: scale(8),
        fontSize: 14,
        opacity: 0.5
    }
});