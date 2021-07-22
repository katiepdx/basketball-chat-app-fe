import React from 'react'
import PropTypes from 'prop-types'

function ChatItem({message}) {
  return (
    <li>
      {message}
    </li>
  )
}

ChatItem.propTypes = {
  message: PropTypes.string.isRequired
}

export default ChatItem
