import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import * as sessionActions from '../../redux/middleware/users';
import { ModalContext } from '../../context/ModalContext';
import { SocketContext } from '../../context/SocketContext';
import { WindowContext } from '../../context/WindowContext';
import { showGamesAction } from '../../redux/actions/gameActions';

import tableIcon from '../../images/table-icon.svg';



import './ProfileButtonModal.css';

function ProfileButtonModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender } = useContext(ModalContext);
  const { socket } = useContext(SocketContext);
  const formRef = useRef(null);

  const user = useSelector(state => state.users.user);
  const balance = useSelector(state=> state.users.balance)

  const {profileBtnRef} = useContext(WindowContext);


  const logout = (e) => {
    socket.emit('disconnect_user')
    dispatch(showGamesAction())
    dispatch(sessionActions.logout());
    history.push('/');
    closeModal();
  };


  const navModal = (type) => {
    closeModal();
    openModal(type)
  };


  useEffect(() => {
    const handleClickOutside = (event) => {

      if (profileBtnRef && profileBtnRef.current && profileBtnRef.current.contains(event.target)) {
        return;
      }
  
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);







  return (
    
    <>
      <div className={`profilemenu`}ref={formRef}>
        {user ? (
          <div>
            <div className='profilemenu-user-info flex'>

              <div className='profilemenu-profileimage-wrapper flex center'>
                <div className='profilemenu-profileimage-container flex center'>
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>


<div className='profilemenu-namebalance-container'>


              <div className='profilemenu-name-container flex'>
                {user.username}
              </div>
              <div className='profilemenu-balance-container flex'>
              <div className='profilemenu-balance-text flex'>
                
                Balance:
              </div>
              <div className={`profilemenu-balance-balance flex ${user && user.balance > 0 ? 'green' : 'red'}`}>
                
                ${user.balance}
              </div>
              </div>

</div>



              {/* 
            <div onClick={false} className={`profileimage-container flex center`}>
              <div className='profileimage-sub-container flex center'>
                    <div className='profileimage-image flex center'><</div>
            
          </div>
              </div>
              <div className='profilemenu-balance'>$ {balance}</div> */}
            </div>

            <div 
            className='profilemenu-cashier flex center' 
            onClick={()=>{
              history.push('/friends')
              closeModal()
              }}>
                <div className='profilemenu-cashier-button flex center'>Cashier</div>
            
            </div>



<div className='profilemenu-section'>
<div className='profilemenu-option'>
            <div className='profilemenu-option-text'>My Tables</div>
                <div className='profilemenu-option-icon'>
                  {/* <img src={tableIcon} alt='table icon' ></img> */}
                  <i className="fa-solid fa-table-cells-large"></i>
                </div>
            </div>
            <div className='profilemenu-option'  
            onClick={()=>{
              history.push('/stats')
              closeModal()
              }}>
                <div className='profilemenu-option-text'>Create Private Table</div>
                <div className='profilemenu-option-icon'><i className="fa-solid fa-signal"></i></div>
            </div>
</div>

<div className='profilemenu-section'>

            <div 
            className='profilemenu-option' 
            onClick={()=>{
              history.push('/friends')
              closeModal()
              }}>
                <div className='profilemenu-option-text'>Friends</div>
                <div className='profilemenu-option-icon'><i className="fa-solid fa-user-group"></i></div>
            
            </div>

            <div 
            className='profilemenu-option' 
            onClick={()=>{
              history.push('/friends')
              closeModal()
              }}>
                <div className='profilemenu-option-text'>Invites</div>
                <div className='profilemenu-option-icon'><i className="fa-solid fa-poo"></i></div>
            
            </div>


</div>


<div className='profilemenu-section'>

<div className='profilemenu-option'>
            <div className='profilemenu-option-text'>Settings</div>
                <div className='profilemenu-option-icon'>
                  {/* <img src={tableIcon} alt='table icon' ></img> */}
                  <i className="fa-solid fa-gear"></i>
                </div>
            </div>


            <div className='profilemenu-option'>
            <div className='profilemenu-option-text'>Themes</div>
                <div className='profilemenu-option-icon'>
                  {/* <img src={tableIcon} alt='table icon' ></img> */}
                  <i className="fa-solid fa-palette"></i>
                </div>
            </div>
</div>









            <div className='profilemenu-option'  
            onClick={()=>{
              history.push('/stats')
              closeModal()
              }}>
                <div className='profilemenu-option-text'>Stats</div>
                <div className='profilemenu-option-icon'><i className="fa-solid fa-signal"></i></div>
            </div>

            <div className='profilemenu-option'  
            onClick={()=>{
              history.push('/stats')
              closeModal()
              }}>
                <div className='profilemenu-option-text'>Game History</div>
                <div className='profilemenu-option-icon'><i className="fa-solid fa-signal"></i></div>
            </div>











          
            <div className='profilemenu-logout-container flex center'>

              <div className='profilemenu-logout-button flex center' onClick={logout}>
                Logout
              </div>
            </div>

          </div>

        ) : (
          <div>
            <div className='profilemenu-option' onClick={() => navModal('login')}>
              Sign In
            </div>
            <div className='profilemenu-option' onClick={() => navModal('signup')}>
              Sign Up
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButtonModal;