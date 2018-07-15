import React, { Component } from 'react';
import loadsh from 'lodash'
import { Redirect, Route, withRouter } from 'react-router-dom';


import RouterMap from './routers/index';
import Loading from '@components/Loading' 
import http from '@utils/http'
import '@style/common.css';
import '@fonts/iconfont.css';
import 'antd/dist/antd.css';

class App extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)){
            return false
        }
        return true
    }
    
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
                <Route path="/" render={() => <Redirect to="/index" />} exact />
                <RouterMap />
            </div>
        ) 
    }
}

export default withRouter(App)