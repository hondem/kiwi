import React, { Component } from 'react';

class ResultsItem extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let adate = new Date(this.props.flight.aTime * 1000);
        let ddate = new Date(this.props.flight.dTime * 1000);
        console.log(adate.getDate(), adate.getMonth(), adate.getFullYear());

        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">{ddate.getDate()}/{ddate.getMonth() + 1}/{ddate.getFullYear()} {ddate.getHours()}:{ddate.getMinutes()} - {this.props.flight.cityFrom}({this.props.flight.countryFrom.code}) -> {this.props.flight.cityTo}({this.props.flight.countryTo.code})</h3>
                </div>
                <div className="panel-body">
                    <p><b>Arrival:</b> {adate.getDate()}/{adate.getMonth() + 1}/{adate.getFullYear()} {adate.getHours()}:{adate.getMinutes()}</p>
                    <p><b>Fly duration:</b> {this.props.flight.fly_duration}</p>
                    <p><b>Distance:</b> {this.props.flight.distance}</p>
                    <p><b>Price:</b> €{this.props.flight.price}</p>
                </div>
            </div>
        );
    }
}

export default ResultsItem;
