import { 
  GET_GAMES, GET_GAME_BY_ID,
  GET_TABLES, GET_TABLES_BY_TYPE, GET_TABLE_BY_ID,
  VIEW_TABLE, LEAVE_TABLE, 
  LEAVE_SEAT, TAKE_SEAT,
  SHOW_GAMES, SHOW_TABLES, SHOW_ACTIVE_TABLES
 } from '../actions/actionTypes'

const initialState = {
  games:{},
  tables: {},
  openTablesByGameType: [],
  currentTables: {},
  activeTable: null,
  showGames: true,
  showTables: false,
}

const gamesReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_GAMES:{
      console.log(action.payload);
      const games = action.payload.reduce((acc, game) => {
        if (!acc[game.gameType]) {
          acc[game.gameType] = game;
        }
        return acc;
      }, {});
      return { ...newState, games: games};
    }

    case GET_TABLES_BY_TYPE:{
      console.log(action.payload);
      return {...newState, openTablesByGameType: action.payload, showGames: false, showTables: true, showActiveTable: false}
    }

    case VIEW_TABLE:{
      console.log('asd');
      console.log(action.payload);
      let newCurrentTables = {...newState.currentTables}
      newCurrentTables[action.payload.id] = action.payload
      return {...newState, currentTables: newCurrentTables, activeTable:action.payload, showGames: false, showTables: false, showActiveTable: true}
    }
    case LEAVE_TABLE: {
      console.log('leaving');
    
      console.log(action.payload);
      let newCurrentTables = { ...newState.currentTables };
      delete newCurrentTables[action.payload.id];
      
      const tableIds = Object.keys(newCurrentTables);
      let activeTable = null;
      
      if (tableIds.length > 0) {
        activeTable = newCurrentTables[tableIds[0]];
      }
    
      return { ...newState, currentTables: newCurrentTables, activeTable };
    }

    case TAKE_SEAT:{
      console.log(action.payload);
      let newCurrentTables = {...newState.currentTables}
      return {...newState}
    } 
    case LEAVE_SEAT:{
      console.log(action.payload);
      return {...newState}
    }
    case SHOW_GAMES:{
      return {...newState, showGames: true, showTables: false, activeTable: null}
    }
    case SHOW_TABLES:{
      return {...newState, showGames: false, showTables: true, activeTable: null}
    }

    // myabe HANDLE_SEAT_CHANGE?
    // case UPDATE_CURRENT_TABLES:{
    //   return newState
    // }



  
    default:
      return newState;
  }
};

export default gamesReducer;