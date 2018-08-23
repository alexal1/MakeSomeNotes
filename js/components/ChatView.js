/**
 * Component with a chat representation of cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, View } from "react-native"
import { Bubble, GiftedChat } from '@alexal1/react-native-gifted-chat'
import type { ChatMessage } from "../containers/ChatViewContainer";
import { colorWhite } from "../resources/colors";
import { openImagePicker } from "../globals";
import ImageView from "./ImageView";

type Props = {
    messages: ChatMessage[],
    colorByMessageId: {[messageId: number]: string},
    onMessageClick: (id: number) => void,
    onMessageSend: (text: ?string, image: ?string) => void
}

export default class ChatView extends PureComponent<Props> {

    _pickedImage: ?string = null;

    render() {
        return (
            <View style={styles.root}>
                <GiftedChat
                    messages={this.props.messages}
                    onPressActionButton={() => {
                        const imageWidth = ImageView.obtainImageWidth();
                        const completion = (base64: string) => {
                            this._pickedImage = base64
                        };
                        openImagePicker(imageWidth, imageWidth, completion)
                    }}
                    renderBubble={(props) => {
                        const messageId = props.currentMessage._id;
                        return (
                            <Bubble
                                {...props}
                                onPress={() => this.props.onMessageClick(messageId)}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: this.props.colorByMessageId[messageId]
                                    },
                                }}
                                textStyle={{
                                    right: {
                                        color: 'black',
                                        fontSize: 14,
                                        lineHeight: 16
                                    },
                                }}
                            />
                        );
                    }}
                    onSend={(messages) => {
                        const text = messages[0] ? messages[0].text : null;
                        const image = this._pickedImage;
                        this.props.onMessageSend(text, image)
                    }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colorWhite
    }
});