import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import "./index.less"


@inject((store) => {
    return {
        // userInfo: store.state.userInfo
    }
}) @observer
class Index extends Component {
    render() {
        return(
            // {this.props.userInfo.name}
            <div className="index"> 这里是INDEX页面</div>
        ) 
    }
}


export default Index;