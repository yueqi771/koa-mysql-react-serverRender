import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';


@inject((store) => {
    console.log(store.state.userInfo)

    return {
        userInfo: store.state.userInfo
    }
}) @observer
class Index extends Component {
    render() {
        return(
            <div> 这里是INDEX页面{this.props.userInfo.name}</div>
        ) 
    }
}


export default Index;