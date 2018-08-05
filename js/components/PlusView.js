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
    createCard: (image: ?string) => void
}

export default class PlusView extends PureComponent<Props> {

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.belowStatusBar}>
                    <TouchableOpacity onPress={() => this.props.createCard(null)}>
                        <Text style={styles.text}>
                            + Note
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        const imageWidth = ImageView.obtainImageWidth();
                        const completion = (base64: string) => this.props.createCard(base64);
                        openImagePicker(imageWidth, imageWidth, completion)
                    }}>
                        <Text style={styles.text}>
                            + Image
                        </Text>
                    </TouchableOpacity>
                </View>
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
    text: {
        marginLeft: scale(27),
        fontSize: 43,
        color: colorBlue,
        lineHeight: 60
    }
});