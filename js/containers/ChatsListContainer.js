/**
 * Container for ChatsList.
 *
 * @flow
 */

import { connect } from 'react-redux'
import ChatsList from "../components/ChatsList";
import { values } from '../globals'
import { setCurrentPage } from "../actions";

const mapStateToProps = (state, ownProps) => {
    return {
        pages: values(state.pages),
        pageId: state.currentPageId,
        openCard: ownProps.openCard
    }
};

const mapDispatchToProps = (dispatch) => ({
    setCurrentPage: (pageId: number) => dispatch(setCurrentPage(pageId))
});

const ChatsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
) (ChatsList);

export default ChatsListContainer