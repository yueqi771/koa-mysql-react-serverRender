import React, { Component } from 'react';
import RouterMap from './routers/index';
import Loading from '@components/Loading' 
import http from '@utils/http'
import '@style/common.css';
import '@fonts/iconfont.css';
import 'antd/dist/antd.css';


class App extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    render() {
        const { loading } = this.state;
        return (
            <div style={{height:'100%'}}>
                {/* {
                    loading ? <Loading /> : null
                } */}
                <RouterMap />
            </div>
        ) 
    }
}

export default App