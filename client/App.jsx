import React, { Component } from 'react';
import RouterMap from './routers/index';

import '@style/common.css';
import '@fonts/iconfont.css';


class App extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <p>这里是首页</p>
                <RouterMap />
            </div>
        ) 
    }
}

export default App