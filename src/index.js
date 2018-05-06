import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import rootReducer from './reducers/index';
import { fetchFlights } from './actions/index';

import SearchForm from './components/SearchForm';
import Results from './containers/Results';

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let store = createStore(rootReducer, applyMiddleware(reduxPromise));

        window.store = store;
        window.fetchFlights = fetchFlights;

        return(
            <Provider store={store}>
                <div>
                    <SearchForm />
                    <Results />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
