import React, { useState, useRef, useEffect, useContext } from 'react';
import { Route, Router, Switch, NavLink, Link,useHistory, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Table.css'

import {changeNeonThemeAction, changeTableThemeAction} from '../../redux/actions/userActions';

import TableSeat from '../TableSeat';
import PlayerBetOptions from '../PlayerBetOptions';
import Card from '../Card';

const Table = () => {

  const dispatch = useDispatch()
  const themes = useSelector(state=>state.users.themes)
  const neonTheme = useSelector(state=>state.users.neonTheme)
  const tableTheme = useSelector(state=>state.users.tableTheme)
  const activeTable = useSelector(state=>state.games.activeTable)
  const currentTables = useSelector(state=>state.games.currentTables)

  const [countdown, setCountdown] = useState(null);
  const [cards, setCards] = useState([]);


  useEffect(()=>{
    if(activeTable && currentTables){
      let currTable = currentTables[activeTable.id];
      let dealerCards = currTable.dealerCards

      setCards(dealerCards)

      console.log(currTable.countdown);
      if(currTable.countdown === 0){
        setCountdown(null);
      }
      if(!countdown && currTable.countdown){
        setCountdown(currTable.countdown/1000);
      }
    }
  },[currentTables, activeTable]);


  useEffect(() => {
    let countdownInterval = null;
    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
 
    if (countdown === 0) {
      console.log('yee');
      setCountdown(null);
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [countdown]);

console.log(cards);
console.log(currentTables);


  return (
    <div className='table-wrapper'>
    <div className='table-container '>
      <div className='table-content flex center'>
        {themes[tableTheme] && <img src={themes[tableTheme].url} alt='table'></img>}
      </div>
      <div className='table-countdown'>{countdown > 0 ? countdown : ''}</div>

      <div className='dealer-cards flex center'>
        {cards && cards.map((card, index) => <Card key={index} card={card} />)}
        {cards && cards.length === 1 && (
          <Card card={'hidden'} />
          )}
      </div>


        <div className='seats-container'>
          <div className='top-seats flex between'>
            <TableSeat seatNumber={1} player={activeTable.tableUsers['1']} />
            <TableSeat seatNumber={6} player={activeTable.tableUsers['6']} />
          </div>
          <div className='mid-seats flex between'>
            <TableSeat seatNumber={2} player={activeTable.tableUsers['2']} />
            <TableSeat seatNumber={5} player={activeTable.tableUsers['5']} />
          </div>
          <div className='bot-seats flex between'>
            <TableSeat seatNumber={3} player={activeTable.tableUsers['3']} />
            <TableSeat seatNumber={4} player={activeTable.tableUsers['4']} />
          </div>
        </div>



    </div>
    </div>
  )
}
export default Table