import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Header from '@components/Header/header'
import "./index.less"


@inject((store) => {
    return {
        // userInfo: store.state.userInfo
    }
}) @observer
class Index extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) {
            return false
        }
        return true
    }
    render() {
        return(
            // {this.props.userInfo.name}
            <div className="index"> 
                <Header />
            </div>
        ) 
    }
}


export default Index;