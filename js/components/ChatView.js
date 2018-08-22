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

type Props = {
    messages: ChatMessage[],
    colorByMessageId: {[messageId: number]: string},
    onMessageClick: (id: number) => void
}

export default class ChatView extends PureComponent<Props> {

    render() {
        return (
            <View style={styles.root}>
                <GiftedChat
                    messages={this.props.messages}
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