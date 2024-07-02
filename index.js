import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import axios from "axios";
import { thunk } from "redux-thunk";

const history = [];

const init = 'init';
const inc = 'increment';
const dec = 'decrement';
const incByAmt = 'incrementByAmount';

const store = createStore(reducer, applyMiddleware(logger.default, thunk));

function reducer(state = { amount: 1 }, action) {
    switch (action.type) {
        case init:
            return { amount: action.payload };
        case inc:
            return { amount: state.amount + 1 };
        case dec:
            return { amount: state.amount - 1 };
        case incByAmt:
            return { amount: state.amount + action.payload };
        default:
            return state;
    }
}

// Action creators
function getUser(id) {
    return async(dispatch,getState)=>{
        const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
        dispatch(initUser(data.amount));
    }
}
function initUser(value) {
    return { type: init, payload: value };
}
function increment() {
    return { type: inc };
}
function decrement() {
    return { type: dec };
}
function incrementByAmount(value) {
    return { type: incByAmt, payload: value };
}

setInterval(() => {
    store.dispatch(getUser(1));
}, 1000);