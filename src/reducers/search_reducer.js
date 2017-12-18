import { SEARCH_BOOKINGS, FETCH_ALL, SHOW_BOOKING, FETCH_TODAY } from '../actions/types';

export default function(state={}, action) {
  switch (action.type) {
    case SEARCH_BOOKINGS:
      return {
        bookings: action.payload.data,
        pageCount: Math.ceil(action.payload.data.length / 10)
      }
    case FETCH_ALL:
      return {
        bookings: action.payload.data,
        pageCount: Math.ceil(action.payload.data.length / 10)
      }
    case FETCH_TODAY:
      return {
        bookings: action.payload.data,
        pageCount: Math.ceil(action.payload.data.length / 10)
      }
    default:
      return state;
  }
}