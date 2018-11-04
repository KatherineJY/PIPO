import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Invest extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        console.log(this.props.routes);
        console.log(this.props.loginInfo);
    }

    render() {
        return (
            <div >
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

export default Invest;