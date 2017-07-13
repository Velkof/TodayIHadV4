/**
 * Created by Marjan on 12-Jul-17.
 */
import React, {Component} from 'react';


export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h4>SEARCH COMPONENT</h4>
                <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                    <input type="text" placeholder="Add ingredients" value=""/>
                        <i className="glyphicon glyphicon-search form-control-feedback"></i>
                </div>
            </div>
        );
    }
}