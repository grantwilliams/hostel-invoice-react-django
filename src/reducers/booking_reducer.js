import { SHOW_BOOKING, SAVE_ADDRESS } from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case SHOW_BOOKING:
      return { ...state, booking: action.payload }
    case SAVE_ADDRESS:
      return { ...state, address: action.payload, addressSaved: true}
    default:
      return state
  }
}