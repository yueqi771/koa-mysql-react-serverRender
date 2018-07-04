import React, { Component } from 'react';
import { Icon } from 'antd'
import PropTypes from 'prop-types';

import './button.less';


class Button extends Component {
    // 传入参数类型验证
    static propTypes = {
        text: PropTypes.string,
        handleClick: PropTypes.func,
        loading: PropTypes.bool,
    }

    render() {
        const { loading, text, handleClick } = this.props;
        return(
            <div className="button">
                {
                    loading ? 
                    <p className="loading-btn"><Icon type="loading" /><i>{ text }</i></p> 
                    : 
                    null
                }

                <p  className="btn-text" onClick={handleClick}>{ text }</p>
            </div>
        )
        
    }
}

export { Button }
