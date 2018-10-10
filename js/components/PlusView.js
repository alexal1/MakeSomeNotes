/**
 * Card with "plus" button to create one more card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { colorBlue, colorLightGrey } from "../resources/colors";
import Globals, { openImagePicker } from "../globals";
import { scale } from "../globals"
import ImageView from "./ImageView";

type Props = {
    createCard: (text: ?string, image: ?string) => void,
    pageTitle: string,
    finish: () => void
}

export default class PlusView extends PureComponent<Props> {

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.belowStatusBar}>
                    <TouchableOpacity onPress={() => this.props.createCard("", null)}>
                        <Text style={styles.text}>
                            + Note
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        const imageWidth = ImageView.obtainImageWidth();
                        const completion = (base64: string) => this.props.createCard(null, base64);
                        openImagePicker(imageWidth, imageWidth, completion)
                    }}>
                        <Text style={styles.text}>
                            + Image
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.topBarTextTouchable}
                    onPress={this.props.finish}>
                    <Text style={styles.topBarText}>
                        {this.props.pageTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colorLightGrey
    },
    belowStatusBar: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: Globals.STATUS_BAR_HEIGHT()
    },
    topBarTextTouchable: {
        position: 'absolute',
        marginTop: Globals.STATUS_BAR_HEIGHT() + scale(26),
        marginLeft: scale(24)
    },
    topBarText: {
        fontSize: 13,
        lineHeight: 20,
        opacity: 0.4
    },
    text: {
        marginLeft: scale(27),
        fontSize: 43,
        color: colorBlue,
        lineHeight: 60
    }
});