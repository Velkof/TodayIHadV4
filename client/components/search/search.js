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
            <div className="container-mob" style={{overflow:'hidden'}}>
                <div className="px-0">
                    <div className="btn btn-default pl-0 f-size-1_5" onClick={this.props.onShowFoodsClick}>
                        <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                        <span>foods</span>
                    </div>
                </div>
                <div id="searchAddRecipe" className="searchBar form-group has-feedback mt-1">
                    <input type="text" autoFocus placeholder="Add ingredients" value=""/>
                        <i className="glyphicon glyphicon-search form-control-feedback"></i>
                </div>
            </div>
        );
    }
}