import React, { Component } from 'react';
import { Route } from 'react-router-dom'

class UserCenter extends Component {
    render() {
        return (
            <div>
                {
                    this.props.routes.map((route, key) => {
                        return (<Route key={key} exact path={route.path}
                            render={props => (<route.component {...props} />)} />)
                    })
                }
            </div>
        );
    }
}

export default UserCenter;