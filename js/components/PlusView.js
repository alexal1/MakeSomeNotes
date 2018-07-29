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
import ImageView from "./ImageView";

type Props = {
    createCard: (image: ?string) => void
}

export default class PlusView extends PureComponent<Props> {

    openImagePicker = () => {
        const ImagePicker = require('react-native-image-picker');
        const options = {
            mediaType: 'photo',
            allowsEditing: true,
            quality: 1,
            maxWidth: ImageView.obtainImageWidth(),
            maxHeight: ImageView.obtainImageWidth()
        };
        ImagePicker.launchImageLibrary(options, (response)  => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('Image picker error: ', response.error);
            }
            else {
                this.props.createCard(response.data)
            }
        });
    };

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.belowStatusBar}>
                    <TouchableOpacity onPress={() => this.props.createCard(null)}>
                        <Text style={styles.text}>
                            + Note
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openImagePicker}>
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