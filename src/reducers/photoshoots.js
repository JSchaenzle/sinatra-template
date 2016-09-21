import { ADD_PHOTOSHOOT_START,
         ADD_PHOTOSHOOT_SUCCESS,
         ADD_PHOTOSHOOT_ERROR,
         UPDATE_PHOTOSHOOT_START,
         UPDATE_PHOTOSHOOT_SUCCESS,
         UPDATE_PHOTOSHOOT_ERROR,
         RETRIEVE_ALL_PHOTOSHOOTS_START,
         RETRIEVE_ALL_PHOTOSHOOTS_SUCCESS,
         RETRIEVE_ALL_PHOTOSHOOTS_ERROR,
         DELETE_PHOTOSHOOT_START,
         DELETE_PHOTOSHOOT_SUCCESS,
         DELETE_PHOTOSHOOT_ERROR
       } from '../actions/actionTypes.js';
var update = require('react-addons-update');

const initialState = {
  retrieving: false,
  usersPhotoshoots: {}
};

const photoshoots = (state = initialState, action) => {
  switch(action.type) {

    case ADD_PHOTOSHOOT_START:
    case UPDATE_PHOTOSHOOT_START:
    case RETRIEVE_ALL_PHOTOSHOOTS_START:
    case DELETE_PHOTOSHOOT_START:
      return update(state, {retrieving: {$set: true}});

    case ADD_PHOTOSHOOT_SUCCESS:
      let stateCopy = Object.assign({}, state);
      if (stateCopy.usersPhotoshoots[action.payload.userId] == null) {
        stateCopy.usersPhotoshoots[action.payload.userId] = [];
      }
      return update(stateCopy, {
        retrieving: {$set: false},
        usersPhotoshoots: {[action.payload.userId]: {$push: [action.payload.photoshoot]}}
      });

    case UPDATE_PHOTOSHOOT_SUCCESS:
      let copy = Object.assign({}, state, {retrieving: false});
      let selectedUsersShoots = copy.usersPhotoshoots[action.payload.userId];
      let shoot = selectedUsersShoots.find(s => {
        return s.id == action.payload.photoshoot.id;
      });
      Object.assign(shoot, action.payload.photoshoot);
      return copy;

    case RETRIEVE_ALL_PHOTOSHOOTS_SUCCESS:
      let newState = update(state, {
        usersPhotoshoots: {[action.payload.userId]: {$set: action.payload.photoshoots}},
        retrieving: {$set: false}
      });
      return newState;

    case DELETE_PHOTOSHOOT_SUCCESS: {
      let copy = Object.assign({}, state, {retrieving: false});
      let selectedUsersShoots = copy.usersPhotoshoots[action.payload.userId];
      let index = selectedUsersShoots.findIndex(s => s.id == action.payload.photoshootId);
      if (index > -1) {
        selectedUsersShoots.splice(index, 1);
      }
      return copy;
    }

    default:
      return state;
  }
};

export default photoshoots;

