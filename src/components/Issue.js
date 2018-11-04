import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Issue extends Component {
    render() {
        return (
            <div>
                {
                    this.props.routes.map((route,key)=>{
                        return (<Route key={key} exact path={route.path} 
                                render={props=>(<route.component {...props} loginInfo={this.props.loginInfo} />)} />)
                    })
                }
            </div>
        );
    }
}

export default Issue;