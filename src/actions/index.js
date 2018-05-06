import axios from 'axios';
import { FETCH_FLIGHTS } from '../constants/action-types';

export function fetchFlights(flights) {
  let apiRequest = `https://api.skypicker.com/flights?v=2&locale=en&flyFrom=${flights.flyFrom}&to=${flights.flyTo}&dateFrom=${flights.dateFrom}&dateTo=${flights.dateTo}&typeFlight=return&returnFrom=${flights.returnFrom}&returnTo=${flights.returnTo}`;

  return {
    type: FETCH_FLIGHTS,
    payload: axios.get(apiRequest)
  };
}
