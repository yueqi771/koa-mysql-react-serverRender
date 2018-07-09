import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

class Link extends Component{
    static propTypes = {
        url: PropTypes.string,
    }

    constructor() {
        super(...arguments)
    }

    render() {
        const { url } = this.props;
        return (
            <span>
                {
                    url ? <Redirect to={url} /> : null
                }
            </span>
        )
    }
}

export default Link;