import React, { useState, useRef, useEffect, useContext } from 'react';
import {Route,Router,Switch,NavLink,Link,useHistory,useParams,} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './PlayerBetOptions.css';
import Chatbox from '../Chatbox';
import {
  leaveTableAction,
  toggleShowMessages,
  addBetAction,
  removeBetAction,
  removeAllBetAction,
  changeActiveTablesAction
} from '../../redux/actions/gameActions';

import { changeTableThemeAction } from '../../redux/actions/userActions';

const PlayerBetOptions = () => {
  const dispatch = useDispatch();

  const [sitOutSelected, setSitOutSelected] = useState(false);
  const [sitOutNextHandSelected, setSitOutNextHandSelected] = useState(false);
  const [lastBet, setLastBet] = useState(0);
  const [isSitting, setIsSitting] = useState(false);
  const [currentSeat, setCurrentSeat] = useState(false);
  const [tableBalance, setTableBalance] = useState(false);

  const currentTables = useSelector((state) => state.games.currentTables);
  const activeTable = useSelector((state) => state.games.activeTable);
  const showMessages = useSelector((state) => state.games.showMessages);
  const user = useSelector((state) => state.users.user);


  useEffect(()=>{
      setIsSitting(false)
      if(activeTable && user){
      Object.values(currentTables[activeTable.id].tableUsers).map(seat=>{
        console.log(seat);

        if(seat.userId === user.id){
          setIsSitting(true)
          setCurrentSeat(seat.seat)
          setTableBalance(seat.tableBalance)
        }
      })
    }
  }, [currentTables])


console.log(tableBalance);

  const handleTableThemeChange = (tableTheme) => {
    console.log(tableTheme);
    dispatch(changeTableThemeAction(tableTheme));
  };

  const leaveTable = () => {
    dispatch(leaveTableAction(activeTable.id));
  };

  const rebet = (multiplier) => {
    if(multiplier){

      return
    }

  };
  const undoBet = (multiplier) => {
    const betObj={
      tableId: activeTable.id,
      user,
      seat: currentSeat,
      lastBet
    }

    if(multiplier){
      dispatch(removeAllBetAction(betObj));
      return
    }
    dispatch(removeBetAction(betObj));


  };


  const addBet = (bet) => {
    if(!user) return
    if(!isSitting) return
    if(bet >= tableBalance){
      bet = tableBalance
    }
    const betObj={
      bet,
      tableId: activeTable.id,
      user,
      seat: currentSeat
    }
    setLastBet(bet)
    dispatch(addBetAction(betObj));
  };



  const handleAction = (action) => {
    dispatch(leaveTableAction(activeTable.id));
  };




  return (
    <>
      <div className="bet-wrapper">
        <div className="bet-container">
          <div className="bet-content">


            <div className="section left">
              <div className="bet-user-settings">
                <div className="gamefloor-leave-button" onClick={leaveTable}>
                  <i className="fa-solid fa-right-to-bracket"></i>
                </div>
                <div
                  className="chatbox-minimize-button"
                  onClick={() => dispatch(toggleShowMessages())}
                >
                  {showMessages ? (
                    <i className="fa-solid fa-comment-slash"></i>
                  ) : (
                    <i className="fa-solid fa-comment"></i>
                  )}
                </div>
              </div>

              <div
                className={`chatbox-wrapper ${showMessages ? '' : 'minimize'}`}
              >
                <Chatbox showMessages={showMessages} />
              </div>
            </div>


{isSitting && (
            <div className="section right flex center">
                <div className="rebet-option-container">
                  <div className="rebet regular" onClick={()=>rebet(true)}>Rebet</div>
                  <div className="rebet double" onClick={()=>rebet(false)}>Rebet x2</div>
                </div>
                <div className="undo-bet-container">
                  <div className="undo one" onClick={()=>undoBet(false)}>Undo</div>
                  <div className="undo all" onClick={()=>undoBet(true)}>Undo all</div>
                </div>
                <div className="chips-option-container">
                  <div className="chip" onClick={()=>addBet(1)}>1</div>
                  <div className="chip" onClick={()=>addBet(5)}>5</div>
                  <div className="chip" onClick={()=>addBet(25)}>25</div>
                  <div className="chip" onClick={()=>addBet(100)}>100</div>
                  <div className="chip" onClick={()=>addBet(500)}>500</div>
                </div>
                <div className="decision-option-container">
                  <div className="action" onClick={()=>handleAction('hit')}>Hit</div>
                  <div className="action" onClick={()=>handleAction('stay')}>Stay</div>
                  <div className="action" onClick={()=>handleAction('double')}>Double</div>
                  <div className="action" onClick={()=>handleAction('split')}>Split</div>
              </div>
            </div>
)}
            




            {/* <div className='flex'>
            <div className='theme-button' onClick={()=>handleTableThemeChange('black')}>black</div>
            <div className='theme-button' onClick={()=>handleTableThemeChange('darkgreen')}>darkgreen</div>
            <div className='theme-button' onClick={()=>handleTableThemeChange('lightgreen')}>lightgreen</div>
            <div className='theme-button' onClick={()=>handleTableThemeChange('red')}>red</div>
            <div className='theme-button' onClick={()=>handleTableThemeChange('realfelt')}>realfelt</div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PlayerBetOptions;
