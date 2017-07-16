/**
 * Created by Marjan on 09-Jul-17.
 */
import React, {Component} from 'react';

class BackToFoodsNav extends Component {
    render() {
        return (
            <div >
                <div className="col-xs-12 px-0">
                    <div className="btn btn-default pl-0 f-size-1_5" onClick={this.props.onShowFoodsClick}>
                        <span className="glyphicon glyphicon-chevron-left" style={{lineHeight:"1.2em"}}></span>
                        <span>foods</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default BackToFoodsNav;