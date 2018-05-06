import React, { Component } from 'react';
import InputAutocomplete from './InputAutocomplete';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { connect } from 'react-redux';
import { fetchFlights } from '../actions/index';
import $ from 'jquery';

class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            'flyFrom': { value: "", id: null},
            'flyTo': { value: "", id: null},
            'dateFrom': null,
            'dateTo': null,
            'returnFrom': null,
            'returnTo': null,

            'flyFromSuggestions': [],
            'flyToSuggestions': []
        };

        this.flyFromChanged = this.flyFromChanged.bind(this);
        this.flyToChanged = this.flyToChanged.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
    }

    render(){
        return(
            <div className="form-wrapper">
                <div className="form-content">
                    <div className="container">
                        <div className="col-md-4">
                            <InputAutocomplete
                                value={this.state.flyFrom.value}
                                placeholder="Fly from"
                                onChange={this.flyFromChanged}
                                suggestions={this.state.flyFromSuggestions}
                            />
                        </div>

                        <div className="col-md-4">
                            <InputAutocomplete
                                value={this.state.flyTo.value}
                                placeholder="Fly to"
                                onChange={this.flyToChanged}
                                suggestions={this.state.flyToSuggestions}
                            />
                        </div>

                        <div className="col-md-2">
                            <DayPickerInput
                                placeholder="Departure from"
                                onDayChange={day => this.setState({ dateFrom: this.formatDate(day) })}
                                parseDate={parse}
                                formatDate={format}
                                format="DD/MM/YYYY"
                            />
                            <DayPickerInput
                                placeholder="Return from"
                                onDayChange={day => this.setState({ returnFrom: this.formatDate(day) })}
                                parseDate={parse}
                                formatDate={format}
                                format="DD/MM/YYYY"
                            />
                        </div>

                        <div className="col-md-2">
                            <DayPickerInput
                                placeholder="Departure to"
                                onDayChange={day => this.setState({ dateTo: this.formatDate(day) })}
                                parseDate={parse}
                                formatDate={format}
                                format="DD/MM/YYYY"
                            />
                            <DayPickerInput
                                placeholder="Return to"
                                onDayChange={day => this.setState({ returnTo: this.formatDate(day) })}
                                parseDate={parse}
                                formatDate={format}
                                format="DD/MM/YYYY"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-send">
                    <button
                        className="form-send-button"
                        onClick={this.searchFlights}
                    >SEARCH</button>
                </div>
            </div>
        );
    }

    flyFromChanged(e){
        this.setState({ flyFrom: e});
        if(e.value.length > 1){
            $.get("https://api.skypicker.com/places?term="+ e.value +"&v=2&locale=en").then(response => {
                this.setState({ flyFromSuggestions: response });
            });
        } else {
            this.setState({ flyFromSuggestions: [] });
        }
    }

    flyToChanged(e){
        this.setState({ flyTo: e});
        if(e.value.length > 1){
            $.get("https://api.skypicker.com/places?term="+ e.value +"&v=2&locale=en").then(response => {
                this.setState({ flyToSuggestions: response });
            });
        } else {
            this.setState({ flyToSuggestions: [] });
        }
    }

    searchFlights(){
        let data = {
            'flyFrom': this.state.flyFrom.id,
            'flyTo': this.state.flyTo.id,
            'dateFrom': this.state.dateFrom,
            'dateTo': this.state.dateTo,
            'returnFrom': this.state.returnFrom,
            'returnTo': this.state.returnTo
        };
        if(data.flyFrom && data.flyTo && data.dateFrom && data.dateTo && data.returnFrom && data.returnTo){
            this.props.fetchFlights(data);
        } else{
            alert("Please fill in every field.");
        }
    }

    formatDate(date){
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFlights: flights => dispatch(fetchFlights(flights))
    };
};

export default connect(null, mapDispatchToProps)(SearchForm);
