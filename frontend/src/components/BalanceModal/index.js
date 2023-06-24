import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './BalanceModal.css';
import { ModalContext } from '../../context/ModalContext';
import { SocketContext } from '../../context/SocketContext';
import * as sessionActions from '../../redux/middleware/users';
import { showGamesAction } from '../../redux/actions/gameActions';

function BalanceModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef(null);

  const [amount, setAmount] = useState('');
  
  const {socket} = useContext(SocketContext)
  const { modal, openModal, closeModal, updateObj, setUpdateObj} = useContext(ModalContext);
  
  const user = useSelector((state) => state.users.user);
  const table = useSelector((state) => state.games.activeTable);


  const addTableBalance = () => {
    console.log(parseInt(amount));

    let roundedAmount = parseInt(amount)
    let seat = updateObj.seatNumber


    if(amount >= updateObj.minBet){
      console.log('yes');
    }

    if(amount < updateObj.minBet){
      console.log('no');
    }
    
    

    
    // socket emit the seat taken, tableID, seat number, player info
    console.log(seat);
    const seatObj = {
      room: table.id,
      seat,
      user: user,
      amount: roundedAmount
    }
    
    closeModal()
    socket.emit('take_seat', seatObj)
    return

  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeModal();
        setUpdateObj(null)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const addBalance = () => {
    const newBalance = 1000
    dispatch(addBalance(user.id, newBalance))
    setUpdateObj(null)
  }

  const cancel = () => {
    closeModal()
    setUpdateObj(null)
  }


  console.log(amount);

  return (
    <div className="balancemodal-wrapper" ref={formRef}>


      {/* Not enough Balance */}
      {user && updateObj.minBet && user.balance < updateObj.minBet && (
        <div className="balancemodal-container flex center">
          <div className="balancemodal-header flex center">
            Insufficient Account Balance!
          </div>
          <div className="balancemodal-subheader flex center">
            {`Minimum buy-in: $${updateObj}`}
          </div>
          <div className="balancemodal-memo-container flex between">
            <div className="balancemodal-memo">{`Balance:`}</div>
            <div className="balancemodal-balance">{`${user?.balance ? user.balance : 0 }`}</div>
            
          </div>
          <div className='balancemodal-user-buttons flex between'>        
            <div className='balancemodal-addbalance flex center' onClick={addBalance}>Add Balance(1000)</div>
            <div className='balancemodal-cancel flex center' onClick={cancel}>Cancel</div>
          </div>
        </div>
      )}



      {user && updateObj.minBet && user.balance >= updateObj.minBet && (
        <div className="balancemodal-container flex center">
          <div className="balancemodal-header white flex center">
            Buy in amount
          </div>
          <div className="balancemodal-subheader flex center">{`Minimum buy-in: $${updateObj.minBet}`}</div>
          <div className="balancemodal-memo-container flex between">
            <div className="balancemodal-memo">Balance:</div>
            <div className="balancemodal-balance">{`$${user.balance ? user.balance : 0}`}</div>
          </div>

        <form onSubmit={addTableBalance}>
          <input
            type="number"
            value={amount} 
            onChange={(e)=>setAmount(e.target.value)}
            placeholder="Enter amount"
            disabled={amount<updateObj.minbet}
          />
        </form>


          <div className="balancemodal-user-buttons flex between">
            <div className="balancemodal-cancel flex center" onClick={cancel}>
              Cancel
            </div>
            <div className={`balancemodal-addbalance flex center ${amount< updateObj.minBet ? ' disabled' : ''}`}onClick={addTableBalance}>
              Submit
            </div>
          </div>
        </div>
      )}




    
    </div>
  );
}

export default BalanceModal;
