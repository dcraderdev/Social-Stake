import React, { useState, useRef, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';

import { getUserFriends } from '../../redux/middleware/friends';

import FriendsNavBar from '../FriendsNavBar'


import './FriendsPage.css'

const FriendsPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user);
  const friends = useSelector(state => state.friends);
  const showFriendInvites = useSelector(state => state.friends.showFriendInvites);
  const showTableInvites = useSelector(state => state.friends.showTableInvites);
  const currentTables = useSelector(state => state.games.currentTables);
  const [hasCurrentTables, setHasCurrentTables] = useState(false);
  const [header, setHeader] = useState('');


  console.log(showFriendInvites);
  console.log(showTableInvites);

  //sets hieght for our sidemenu in case we have currentGames
  useEffect(()=>{
    setHasCurrentTables(Object.entries(currentTables).length > 0)
  },[currentTables])


  // clean up any states when component unmounts
  useEffect(() => {
    return () => {
      console.log('cleaning up');
      setHeader('');
    };
  }, []); 


  useEffect(()=>{
    console.log(showFriendInvites);
    console.log(showTableInvites);
    if(showFriendInvites){
      setHeader('Friend Invites')
    }
    if(showTableInvites){
      setHeader('Table Invites')
    }
  },[showFriendInvites, showTableInvites])





  useEffect(()=>{
    if(!user)return
    dispatch(getUserFriends(user.id))
  },[user])

  return (
    <div className='friendspage-wrapper flex'>

      <div className={`friendspage-friendsnavbar-wrapper  ${hasCurrentTables ? ' expanded' : ' shrunk'}`}>
        <FriendsNavBar/>
      </div>
      
      <div className={`friendspage-content-wrapper flex  ${hasCurrentTables ? ' expanded' : ' shrunk'}`}>

<div className='friendspage-header flex center'>
        {header}
</div>

            


        {showFriendInvites && (
          <div>

            


          </div>
        )}

      </div>



    </div>
    
  )
}
export default FriendsPage