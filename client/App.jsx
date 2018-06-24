import React, { Component } from 'react';
import RouterMap from './router/index';

import 'antd/dist/antd.css';
import '@style/common.css';
import '@font/iconfont.css';


class App extends Component {
    render() {
        return (
            <div  style={{height:'100%'}}>
                <p>这里是首页</p>
                <RouterMap />
            </div>
        ) 
    }
}

export default App