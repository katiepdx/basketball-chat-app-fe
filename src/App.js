import { useState, useEffect } from 'react';
import './App.css';
// import socketio - https://socket.io/docs/v4/client-initialization/
import { io } from 'socket.io-client';
import ChatList from './components/ChatList';
import ChatForm from './components/ChatForm';

// connect to socket
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true
})

function App() {
  const [messages, setMessages] = useState([])
  const [msgContent, setMsgContent] = useState('')

  useEffect(() => {
    // get current messages from the server and set them to state on client socket connection
    socket.on('current-messages', (payload) => setMessages(payload))

    // listen for new msg from server (sent by other clients)
    socket.on('new-message', (newMsg) => {
      // updates the state array with incoming the incoming message
      setMessages((messages) => [...messages, newMsg])
    })

    // disconnect socket 
    socket.on('disconnect', () => {
      console.log(`FE: socket id ${socket.id} disconnected`)
    })
    
    return(() => {
      // disconnect socket when user leaves page
      socket.disconnect()
    })
  }, [])

  
  // HANDLERS
  // set msg content to state
  const handleMsgChange = (e) => setMsgContent(e.target.value)
  // send message
  const handleSubmit = (e) => {
    e.preventDefault()

    // send new message to the server
    socket.emit('send-new-msg', msgContent)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Messages: 
            <ChatList messages={messages}/>
        </p>

        <ChatForm 
          handleSubmit={handleSubmit}
          handleMsgChange={handleMsgChange}
          msgContent={msgContent}
        />
      </header>
    </div>
  );
}

export default App;
