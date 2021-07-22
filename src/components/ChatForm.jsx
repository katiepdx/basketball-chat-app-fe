import React from 'react'
import PropTypes from 'prop-types'

function ChatForm({ handleSubmit, handleMsgChange, msgContent}) {
  return (
    <form onSubmit={handleSubmit}>
      <input data-testid='new-msg-input' type="text" value={msgContent} onChange={handleMsgChange}/>
      <button aria-label='send-button'>Send</button>
    </form>
  )
}

ChatForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleMsgChange: PropTypes.func.isRequired,
  msgContent: PropTypes.string.isRequired
}

export default ChatForm
