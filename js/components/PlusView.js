/**
 * Card with "plus" button to create one more card.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { colorBlue, colorLightGrey } from "../resources/colors";
import Globals from "../globals";
import { scale } from "../globals"

type Props = {
    createCard: () => void
}

export default class PlusView extends PureComponent<Props> {

    static openImagePicker() {
        const ImagePicker = require('react-native-image-picker');
        const options = {
            mediaType: 'photo',
            allowsEditing: true,
            quality: 1,
            maxWidth: Globals.SCREEN_WIDTH,
            maxHeight: Globals.SCREEN_HEIGHT
        };
        ImagePicker.launchImageLibrary(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('Image picker error: ', response.error);
            }
            else {
                console.log(response.data)
            }
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.belowStatusBar}>
                    <TouchableOpacity onPress={this.props.createCard}>
                        <Text style={styles.text}>
                            + Note
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={PlusView.openImagePicker}>
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
        fontSize: scale(43),
        color: colorBlue,
        lineHeight: scale(60)
    }
});