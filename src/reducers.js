import fetch from 'cross-fetch'

const API_BASE_URL = "http://demo6439235.mockable.io/";

//--------------------------------- CONSTANTS --------------------------------------- //
const LOAD_MANAGERS = 'LOAD_MANAGERS';
const LOAD_MANAGERS_SUCCESS = 'LOAD_MANAGERS_SUCCESS';
const LOAD_MANAGERS_FAILED = 'LOAD_MANAGERS_FAILED';
const LOAD_MANAGERS_API_KEY = `${API_BASE_URL}listManagers`;

const EDIT_MANAGER = 'EDIT_MANAGER';
const EDIT_MANAGER_SUCCESS = 'EDIT_MANAGER_SUCCESS';
const EDIT_MANAGER_FAILED = 'EDIT_MANAGER_FAILED';
const EDIT_MANAGER_API_KEY = `${API_BASE_URL}:id/editManagers`;

const DELETE_MANAGER = 'DELETE_MANAGER';
const DELETE_MANAGER_SUCCESS = 'DELETE_MANAGER_SUCCESS';
const DELETE_MANAGER_FAILED = 'DELETE_MANAGER_FAILED';
const DELETE_MANAGER_API_KEY = `${API_BASE_URL}:id/deleteManagers`;


//--------------------------------- REDUCERS --------------------------------------- //
export default (state = {}, action = {}) => {
  switch (action.type) {
    case LOAD_MANAGERS_SUCCESS:
      return {
        ...state,
        managers: action.managers,
        updated: false,
        deleted: false,
      }
    case EDIT_MANAGER_SUCCESS:
      return {
        ...state,
        updated: "Manager Updated",
      };
    case DELETE_MANAGER_SUCCESS:
      return {
        ...state,
        deleted: "Manager deleted",
      };
    default:
      return state;
  }
}


//--------------------------------- ACTIONS --------------------------------------- //
export function fetchManagers() {
  return dispatch => {
    return fetch(LOAD_MANAGERS_API_KEY)
      .then(response => response.json())
      .then(json => dispatch({
        type: LOAD_MANAGERS_SUCCESS,
        managers: json
      }))
  }
}

export function removeManager(id, managers=[]) {
  // USING API APPROCH
  // return dispatch => {
  //   return fetch(DELETE_MANAGER_API_KEY.replace(":id", id), { method: 'delete' })
  //     .then(response => response.json())
  //     .then(json => {
  //       dispatch({
  //         type: DELETE_MANAGER_SUCCESS,
  //         managers: json
  //       })
  //       dispatch(fetchManagers())
  //     })
  // }
  const index = managers.findIndex(m => m.id === id);
  if(index !== -1) {
    managers.splice(index, 1);
  }

  return dispatch => {
    dispatch({
      type: DELETE_MANAGER_SUCCESS,
      managers: []
    })

    dispatch({
      type: LOAD_MANAGERS_SUCCESS,
      managers: managers
    })
  }
}

export function editManager(manager, managers = []) {
  // USING API APPROCH
  // return dispatch => {
  //   return fetch(EDIT_MANAGER_API_KEY.replace(":id", manager.id), {
  //       method: 'put',
  //       body: JSON.stringify(manager)
  //     })
  //     .then(response => response.json())
  //     .then(json => {
  //       dispatch({
  //         type: EDIT_MANAGER_SUCCESS,
  //         managers: json
  //       })
  //       dispatch(fetchManagers())
  //     })
  // }
  const index = managers.findIndex(m => m.id === manager.id);
  if(index !== -1) {
    managers[index] = manager;
  }

  return dispatch => {
    dispatch({
      type: EDIT_MANAGER_SUCCESS,
      managers: []
    })

    dispatch({
      type: LOAD_MANAGERS_SUCCESS,
      managers: managers
    })
  }
}

