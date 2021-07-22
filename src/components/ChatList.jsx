import React from 'react'
import PropTypes from 'prop-types'
import ChatItem from './ChatItem';

function ChatList({ messages }) {
  return <ul aria-label="message-list">
     {messages.map((message, index) => <ChatItem message={message} key={index}/>)}
  </ul>
}

ChatList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string)
}

export default ChatList
