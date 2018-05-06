import React, { Component } from 'react';

class InputAutocomplete extends Component{
    constructor(props){
        super(props);
        this.inputChanged = this.inputChanged.bind(this);
        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.state = {
            autocompleteActive: true
        }
    }

    render(){
        let suggestionsHTML = [];
        if(this.state.autocompleteActive){
            suggestionsHTML = this.props.suggestions.slice(0, 5).map(item => {
                return <div key={item.id} className="input-suggestion" onClick={() => this.suggestionSelected(item.id, item.value)}>{item.value}</div>;
            });
        }

        return(
            <div className="input-autocomplete">
                <div className="input-autocomplete-input">
                    <input
                        type="text"
                        placeholder={this.props.placeholder ? this.props.placeholder : null}
                        value={this.props.value ? this.props.value : ""}
                        onChange={this.inputChanged}
                    />
                </div>
                <div className="input-autocomplete-suggestions">{suggestionsHTML}</div>
            </div>
        );
    }

    inputChanged(e){
        this.setState({ autocompleteActive: true });
        this.props.onChange({ value: e.target.value, id: null});
    }

    suggestionSelected(id, value){
        this.setState({ autocompleteActive: false });
        this.props.onChange({ value: value, id: id});
    }
}

export default InputAutocomplete;
