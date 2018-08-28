/**
 * Miniature of the image chosen by user to attach to the message in ChatView.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { scale } from "../globals";

type Props = {
    image: string,
    onImageDelete: () => void
}

export default class AttachedImageView extends PureComponent<Props> {

    static TOTAL_HEIGHT = scale(64);

    _rootWidth: ?number = null;

    _updateImageWidth() {
        Image.getSize('data:image/jpeg;base64,' + this.props.image, (rawWidth, rawHeight) => {
            this._rootWidth = AttachedImageView.TOTAL_HEIGHT * rawWidth / rawHeight;
            this.forceUpdate()
        });
    }

    _renderImage() {
        return (
            <View style={[styles.root, {width: this._rootWidth}]}>
                <Image
                    style={styles.image}
                    source={{uri: 'data:image/jpeg;base64,' + this.props.image}}/>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={this.props.onImageDelete}>
                    <Image
                        style={styles.icon}
                        source={require('../resources/images/ic_circle_cross.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return this._rootWidth ? this._renderImage() : null
    }

    componentDidMount() {
        this._updateImageWidth()
    }

}

const styles = StyleSheet.create({
    root: {
        height: AttachedImageView.TOTAL_HEIGHT
    },
    image: {
        flex: 1,
        borderRadius: 4,
        margin: scale(8)
    },
    touchable: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    icon: {
        opacity: 0.4
    }
});