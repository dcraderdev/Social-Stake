import React, { createContext, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import * as gameActions from '../redux/middleware/games';
import {takeSeatAction} from '../redux/actions/gameActions';


const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch()
  
  const [socket, setSocket] = useState(null);
  
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    if(!user){
      return
    }
    let userId = user.id
    let username = user.username

    const backendUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_PROD_URL : 'http://localhost:8000';
    const socketConnection = io(backendUrl, {
      query: { userId, username },
    });


    
    setSocket(socketConnection);
    


    return () => {
      
      socketConnection.disconnect();
    };
  }, [user]); 

  console.log(socket);



  useEffect(() => {
    if(socket){
      
      if(user){
        socket.emit('initialize_messages');
      }
      

      socket.on('new_message', (messageObj) => {
        dispatch(gameActions.addMessage(messageObj));
      });

      socket.on('new_player', (seatObj) => {
        console.log(seatObj);
        console.log('heerererereeeee');
        dispatch(takeSeatAction(seatObj));
      });    


      return () => {
        socket.off('new_player');
        socket.off('message');
        socket.off('initialize_messages');

      };
      
    }
  }, [socket]);



  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};



export { SocketContext, SocketProvider };
 

