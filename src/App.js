import './App.css';
import { useEffect,useState } from 'react';
import AllRoutes from './routes/AllRoutes';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import _ from 'lodash';

function App() {

  const [msgs,setMsgs]=useState("")
  let client = new W3CWebSocket('ws://127.0.0.1:8000/ws/' + this.state.room + '/');

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMsgs([
            ...msgs,
            {
              msg: dataFromServer.text,
              name: dataFromServer.sender,
            },
          ]);
      }
    };
  }, [])

  return (
    <>
    {
      _.map((msgs,idx)=>{
        return <p key={idx}>asd</p>
      })
    }
      <AllRoutes />
    </>
  );
}

export default App;
