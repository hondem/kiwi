import { FETCH_FLIGHTS } from "../constants/action-types";

const initialState = {
    flights: []
};

const flights = (state = initialState, action) => {
    switch(action.type){
        case FETCH_FLIGHTS:
            return action.payload;
        break;
        default:
            return state;
    }
};

export default flights;
