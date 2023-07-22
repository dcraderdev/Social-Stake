import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './FriendsNavBar.css'


import SearchBar from '../SearchBar';
import FriendTile from '../FriendTile';

const FriendsNavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [hasCurrentTables, setHasCurrentTables] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const currentTables = useSelector(state => state.games.currentTables);
  const friends = useSelector(state => state.friends);

  const viewFriends = 'view-friends'
  const viewInvites = 'view-invites'
  const viewConversations = 'view-conversations'


//sets hieght for our sidemenu in case we have currentGames
  useEffect(()=>{
    setHasCurrentTables(Object.entries(currentTables).length > 0)
  },[currentTables])

  //select which submenu is focused(opened)
  const toggleFocus = (focus) => {
    if(focus === currentFocus){
      setCurrentFocus(null)
      return
    }
    setCurrentFocus(focus)
  }


console.log(friends);
console.log(friends.friends);



  return (
    <div className={`friendsnavbar-wrapper flex ${hasCurrentTables ? ' expanded' : ' shrunk'}`}>
      <div className="friendsnavbar-container flex ">


        <div className="friendsnavbar-main-header flex center">
          <SearchBar/>
        </div>

        <div onClick={()=>toggleFocus(viewInvites)} className={`friendsnavbar-option invites ${currentFocus === viewInvites ? 'invites-extended' : ''}`}>

          <div className={`friendsnavbar-nav-header flex center `}>
            <div>Invites</div>
          </div>
          <div className="friendsnavbar-nav-header flex center">Incoming</div>
          <div className="friendsnavbar-nav-header flex center">Requests</div>




        </div>


        <div className={`friendsnavbar-option ${currentFocus === viewFriends ? 'friends-extended' : ''}`}>

          <div onClick={()=>toggleFocus(viewFriends)} className={`friendsnavbar-nav-header flex center`}>
            <div>Friends</div>
          </div>


          {friends && Object.entries(friends.friends).map(([key,friend],index) => {
            return (
            <FriendTile key={index} friend={friend} type={'submenu'}/>
            )
          })}


        </div>



        <div onClick={()=>toggleFocus(viewConversations)}  className={`friendsnavbar-option ${currentFocus === viewConversations ? 'friends-extended' : ''}`}>

          <div className={`friendsnavbar-nav-header flex center`}>
            <div>Conversations</div>
          </div>

          { [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,].map((friend,index) => {
            return (<div key={index}>{friend}</div>)
          })}

        </div>






      </div>
  </div>
  )
}
export default FriendsNavBar