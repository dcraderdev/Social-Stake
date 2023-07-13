import { 

  createTableAction,
  deleteTableAction,
  updateTableAction, updateTableNameAction,
  getAllGamesAction, getGameByIdAction,
  getAllTablesAction, getTablesByTypeAction, getTableByIdAction,
  viewTableAction, leaveTableAction, 
  takeSeatAction, leaveSeatAction, changeSeatAction,
  addMessageAction, addBalanceAction,
  addBetAction, removeBetAction

  } 
  from '../actions/gameActions'
import { csrfFetch } from './csrf';




export const getAllGames = () => async (dispatch) => {
    const response = await csrfFetch('/api/games/all', {
      method: 'GET',
    });
    const data = await response.json();
  
    dispatch(getAllGamesAction(data));
    return {data, response};
  };
  
  export const getAllTables = (gameId) => async (dispatch) => {
    console.log('here before fail');
    try{
      const response = await csrfFetch(`/api/games/${gameId}/tables`, {
        method: 'GET',
      });
      const data = await response.json();
 
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');

      dispatch(getAllTablesAction(data));
      return {data, response};

    }catch(error){
      console.log(error);
    }
  };     

  export const getGameById = (gameId) => async (dispatch) => {
    try{
      const response = await csrfFetch(`/api/games/${gameId}`, {
        method: 'GET',
      });
      const data = await response.json();
 
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');

      dispatch(getAllGamesAction(data));
      return {data, response};

    }catch(error){
      console.log(error);
    }
  }

  export const getTablesByType = (gameId) => async (dispatch) => {
    try{
      const response = await csrfFetch(`/api/tables/game/${gameId}`, {
        method: 'GET',
      });
      const data = await response.json();
 
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');

      dispatch(getTablesByTypeAction(data));
      return {data, response};

    }catch(error){
      console.log(error);
    }
  };  

  

  export const getTableById = (tableId) => async (dispatch) => {

    try{
      const response = await csrfFetch(`/api/tables/${tableId}`, {
        method: 'GET',
      });
      const data = await response.json();
 
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');

      dispatch(getTableByIdAction(data));
      return {data, response};

    }catch(error){
      console.log(error);
    }
  };  

  export const viewTable = (tableId) => async (dispatch) => {
    console.log('view table');
    try{
      const response = await csrfFetch(`/api/tables/${tableId}`, {
        method: 'GET'
      });
 

      const data = await response.json();
  
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');
   
      dispatch(viewTableAction(data));

      return {data, response};
  
    }catch(error){
      console.log(error);
    } 
  };

  export const createTable = (tableObj, socket) => async (dispatch) => {
    console.log('view table');
    console.log(tableObj);
    try{
      const response = await csrfFetch(`/api/tables/create`, {
        method: 'POST',
        body: JSON.stringify({
          tableObj
        })
      });
 

      const data = await response.json();
      
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');
      
      dispatch(createTableAction(data));
      let tableId = data.table.id
      socket.emit('join_room', tableId);
      return {data, response};
  
    }catch(error){
      console.log(error);
    } 
  };

  export const deleteTable = (tableObj) => async (dispatch) => {
    console.log('delete table');
    try{
      const response = await csrfFetch(`/api/tables/create`, {
        method: 'DELETE'
      });
 

      const data = await response.json();
  
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');
   
      dispatch(createTableAction(data));
      return {data, response};
  
    }catch(error){
      console.log(error);
    } 
  };


  export const editTableName = (tableObj, socket) => async (dispatch) => {
    console.log('edit table');
    const {tableId } = tableObj
    try{
      const response = await csrfFetch(`/api/tables/${tableId}/edit`, {
        method: 'PUT',
        body: JSON.stringify({tableObj})
      });
 

      const data = await response.json();
  
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');
   
      let updateObj = {
        tableId: data.table.id,
        tableName: data.table.tableName
      }
      socket.emit('update_table_name', updateObj)
      return {data, response};
  
    }catch(error){
      console.log(error);
    } 
  };


  export const joinPrivateTable = (tableId, password) => async (dispatch) => {
    try{
      const response = await csrfFetch(`/api/tables/${tableId}/private`, {
        method: 'PUT',
        body: JSON.stringify({
          tableId,
          password
        })
      });
      const data = await response.json();
  
      console.log('-=-=-=-=');
      console.log(data); 
      console.log('-=-=-=-=');
  
      dispatch(viewTableAction(data));
      return {data, response};
  
    }catch(error){
      console.log(error);
    }
  }; 



export const changeSeat = (tableId, seat) => async (dispatch) => {
  try{
    const response = await csrfFetch(`/api/tables/${tableId}/seat`, {
      method: 'PUT',
      body: JSON.stringify({
        seat
      })
    });
    const data = await response.json();

    console.log('-=-=-=-=');
    console.log(data); 
    console.log('-=-=-=-=');

    dispatch(changeSeatAction(data));
    return {data, response};

  }catch(error){
    console.log(error);
  }
}; 


export const leaveSeat = (tableId, seat) => async (dispatch) => {

  try{
    const response = await csrfFetch(`/api/tables/${tableId}/leave`, {
      method: 'DELETE',
    });
    const data = await response.json();

    console.log('-=-=-=-=');
    console.log(data); 
    console.log('-=-=-=-='); 
    if(data){
      dispatch(leaveSeatAction(tableId, seat));
    }
    return {data, response};

  }catch(error){
    console.log(error);
  } 
}; 

export const addMessage = (messageObj) => async (dispatch) => {
  console.log(messageObj);
  const {content, room,  user} = messageObj
  let tableId = room

  dispatch(addMessageAction(messageObj));
  if(user.username === 'Room') return
  try{
    const response = await csrfFetch(`/api/tables/${tableId}/message`, {
      method: 'POST',
      body: JSON.stringify({
        content
      })
    });
    const data = await response.json();

    console.log('-=-=-=-=');
    console.log(data); 
    console.log('-=-=-=-='); 
    if(data){
      return data;
    }

  }catch(error){
    console.log(error);
  } 
}; 


// export const addBalance = (userId, newBalance) => async (dispatch) => {

//   dispatch(addBalanceAction());
//   if(user.username === 'Room') return
//   try{
//     const response = await csrfFetch(`/api/users/${userId}/addbalance`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         newBalance
//       })
//     });
//     const data = await response.json();

//     console.log('-=-=-=-=');
//     console.log(data); 
//     console.log('-=-=-=-='); 
//     if(data){
//       return data;
//     }

//   }catch(error){
//     console.log(error);
//   } 
// }; 