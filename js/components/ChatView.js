/**
 * Component with a chat representation of cards.
 *
 * @flow
 */

import React, { PureComponent } from "react";
import { Bubble, GiftedChat } from '@alexal1/react-native-gifted-chat'
import type { ChatMessage } from "../containers/ChatViewContainer";

type Props = {
    messages: ChatMessage[],
    onMessageClick: (id: number) => void
}

export default class ChatView extends PureComponent<Props> {

    render() {
        return (
            <GiftedChat
                messages={this.props.messages}
                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            onPress={() => this.props.onMessageClick(props.currentMessage._id)}
                        />
                    );
                }}/>
        )
    }

}