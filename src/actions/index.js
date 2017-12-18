import axios from 'axios';
import moment from 'moment';
import qs from 'qs/dist/qs';
import { SEARCH_BOOKINGS, FETCH_ALL, SHOW_BOOKING, FETCH_TODAY, SAVE_ADDRESS } from '../actions/types';

const ROOT_URL = 'http://127.0.0.1:8000'

export function fetchAllBookings() {
  const request = axios.get(`/myallocator/search/all/`);

  return {
    type: FETCH_ALL,
    payload: request
  }
}

export function searchBookings(query) {
  const request = axios.get(`/myallocator/search/?q=${query}`)

  return {
    type: SEARCH_BOOKINGS,
    payload: request
  }
}

export function fetchBooking(id) {
  return function(dispatch) {
  axios.get(`/myallocator/booking/?id=${id}`)
    .then(({ data }) => {
      const fee = data.channel == 'hc' ? 2 : 0
      const total_price = data.total_price - fee
      const pricePerNight = total_price / data.nights / data.pax
      const vat = total_price * 0.07
      const cityTax = total_price * 0.05
      const invoiceDate = moment(data.arrival_date) > moment() ? moment().format("YYYY-MM-DD") : data.arrival_date

      dispatch({
        type: SHOW_BOOKING,
        payload: { ...data, fee, total_price, pricePerNight, vat, cityTax, invoiceDate }
      })
    })
  }
}

export function addNewBooking(formProps) {
  const randomNum = Math.ceil(Math.random() * 10000000000)
  const postData = {
    booking_id: `${formProps.first_name}${formProps.last_name}${randomNum}`,
    channel: 'walk in',
    booking_date: formProps.booking_date,
    booking_time: moment().format("HH:mm:ss"),
    arrival_date: formProps.arrival_date,
    departure_date: formProps.departure_date,
    nights: formProps.nights,
    first_name: formProps.first_name,
    last_name: formProps.last_name,
    email: formProps.email,
    pax: formProps.pax,
    room_names: formProps.room_names,
    total_price: formProps.total_price,
    deposit: formProps.deposit
  }
  axios.post(`/myallocator/booking/add/`, qs.stringify(postData))
}

export function editAllBooking(formProps) {
  return function(dispatch, getState) {
    let { booking } = getState().booking
    if(!booking) {
      addNewBooking(formProps)
    }
    const { company, street, city, country, ...restProps } = formProps
    restProps.total_price = parseFloat(restProps.total_price)
    restProps.deposit = parseFloat(restProps.deposit)
    const pricePerNight = restProps.total_price / restProps.nights / restProps.pax
    const vat = restProps.total_price * 0.07
    const cityTax = restProps.total_price * 0.05
    const invoiceDate = moment(restProps.arrival_date) > moment() ? moment().format("YYYY-MM-DD") : restProps.arrival_date

    booking = { ...booking, ...restProps, pricePerNight, vat, cityTax, invoiceDate }
    dispatch({
      type: SAVE_ADDRESS,
      payload: { company, street, city, country }
    })
    dispatch({
      type: SHOW_BOOKING,
      payload: booking
    })
  }
}

export function addNight(location) {
  return function(dispatch, getState) {
    let { booking } = getState().booking
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(booking.arrival_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(booking.departure_date).add(1, 'days').format("YYYY-MM-DD")
      }
    }
    booking = {
      ... booking,
      ...dateToChange,
      nights: booking.nights + 1,
      total_price: booking.total_price + (booking.pricePerNight * booking.pax),
      vat: (booking.total_price + (booking.pricePerNight * booking.pax)) * 0.07,
      cityTax: (booking.total_price + (booking.pricePerNight * booking.pax)) * 0.05
    };
    dispatch({
      type: SHOW_BOOKING,
      payload: booking
    })
  }
}

export function subtractNight(location) {
  return function(dispatch, getState) {
    let { booking } = getState().booking
    let dateToChange;
    if(location == 'start') {
      dateToChange = {
        arrival_date: moment(booking.arrival_date).add(1, 'days').format("YYYY-MM-DD")
      }
      } else {
        dateToChange = {
          departure_date: moment(booking.departure_date).subtract(1, 'days').format("YYYY-MM-DD")
      }
    }
    booking = {
      ... booking,
      ...dateToChange,
      nights: booking.nights - 1,
      total_price: booking.total_price - (booking.pricePerNight * booking.pax),
      vat: (booking.total_price - (booking.pricePerNight * booking.pax)) * 0.07,
      cityTax: (booking.total_price - (booking.pricePerNight * booking.pax)) * 0.05
    };
    dispatch({
      type: SHOW_BOOKING,
      payload: booking
    })
  }
}

export function fetchTodaysArrivals() {
  const request = axios.get(`/myallocator/search/today/`)

  return {
    type: FETCH_TODAY,
    payload: request
  }
}

export const saveAddress = (formProps) => ({
  type: SAVE_ADDRESS,
  payload: formProps
})