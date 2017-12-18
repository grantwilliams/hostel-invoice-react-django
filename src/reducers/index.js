import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import SearchReducer from './search_reducer';
import BookingReducer from './booking_reducer';

const rootReducer = combineReducers({
  form,
  search: SearchReducer,
  booking: BookingReducer
});

export default rootReducer;