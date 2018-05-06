import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import ResultsItem from '../components/ResultsItem';

const mapStateToProps = state => {
    return { flights: state.flights };
};

class Results extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.flights.data);
        if(typeof this.props.flights.data != 'undefined'){
            let resultsHTML = $.map(this.props.flights.data.data, flight => {
                return <ResultsItem flight={flight} />
            });
            return(
                <div className="container results">{resultsHTML}</div>
            );
        } else {
            return(
                <div />
            );
        }
    }
}

export default connect(mapStateToProps)(Results);
