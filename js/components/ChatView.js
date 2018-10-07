/**
 * Component with a chat representation of cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native"
import {
    Actions,
    Bubble,
    Composer,
    GiftedChat,
    InputToolbar,
    Send
} from '@alexal1/react-native-gifted-chat'
import type { ChatMessage } from "../containers/ChatViewContainer";
import { colorWhite } from "../resources/colors";
import { openImagePicker, scale } from "../globals";
import ImageView from "./ImageView";
import AttachedImageView from "./AttachedImageView";

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
            <GiftedChat
                messages={this.props.messages}
                onPressActionButton={() => {
                    const imageWidth = ImageView.obtainImageWidth();
                    const completion = (base64: string) => {
                        this._pickedImage = base64;
                        this.forceUpdate()
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
                alwaysShowSend={this._pickedImage != null}
                accessoryHeight={this._pickedImage ? AttachedImageView.TOTAL_HEIGHT : 0}
                renderComposer={(props) => {
                    return (
                        <Composer
                            {...props}
                            textInputStyle={styles.textInputStyle}
                            placeholder={"+ Make Some Note"} />
                    )
                }}
                renderAccessory={this._pickedImage ? this._renderAccessory : null}
                renderSend={(props) => {
                    return (
                        <Send
                            {...props}
                            containerStyle={styles.containerSend}>
                                <Image
                                    style={styles.send}
                                    source={require('../resources/images/ic_send.png')}/>
                        </Send>
                    )
                }}
                renderActions={(props) => {
                    return (
                        <Actions
                            {...props}
                            icon={() => {
                                return (
                                    <Image
                                        style={styles.actions}
                                        source={require('../resources/images/ic_camera_24_black.png')}/>
                                )
                            }}>
                        </Actions>
                    )
                }}
                renderInputToolbar={(props) => {
                    return (
                        <InputToolbar
                            {...props}
                            primaryStyle={styles.inputToolbarPrimaryStyle}
                            containerStyle={styles.inputToolbarContainerStyle}
                            />
                    )
                }}
                onSend={(messages) => {
                    const text = messages[0] ? (messages[0].text ? messages[0].text : null) : null;
                    const image = this._pickedImage;
                    this._pickedImage = null;
                    this.props.onMessageSend(text, image)
                }}/>
        )
    }

    _renderAccessory = () => {
        return (
            <AttachedImageView
                image={this._pickedImage ? this._pickedImage : ""}
                onImageDelete={() => {
                    this._pickedImage = null;
                    this.forceUpdate()
                }}/>
        )
    }

}

const styles = StyleSheet.create({
    containerSend: {
        justifyContent: 'center'
    },
    send: {
        marginTop: scale(8),
        marginRight: scale(8),
        marginBottom: scale(8)
    },
    actions: {
        opacity: 0.5
    },
    inputToolbarContainerStyle: {
        borderTopWidth: 0
    },
    inputToolbarPrimaryStyle: {
        backgroundColor: colorWhite,
    },
    textInputStyle: {
        paddingLeft: 8,
        borderRadius: 8,
        backgroundColor: 'white',
        marginRight: scale(8)
    }
});