import { useState, useEffect } from 'react';
import './App.css';
// import socketio - https://socket.io/docs/v4/client-initialization/
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true
})

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // get current count from socket server
    socket.on('current-count', (payload) => {
      setCount(payload)
    })

    // listen for click updates from server from other clients
    socket.on('increment-click', (payload) => {
      console.log(`FE: ${socket.id} clicked ${payload} times`)
      // updates the state count with incoming clicks
      setCount(payload)
    })
    
  }, [count])

  const handleClick = () => {
    // send updated click count to server
    socket.emit('user-click')

  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Count: {count}</p>
        <button onClick={handleClick}>Click Counter</button>
      </header>
    </div>
  );
}

export default App;
