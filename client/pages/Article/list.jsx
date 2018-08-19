import React, { Component } from 'react';

import Header from '@components/Header/header'
import http from '@utils/http'
import './list.less'

class ArticleList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            articleType: [],
        }   
    }

    componentDidMount() {
        // 获取所有文章类型
        http.get({
            url: '/article/getType'
        }).then(res => {
            this.setState({
                articleType: res.type ? res.type : []
            })
        })
    }

    render() {
        const { articleType } = this.state;
        return(
            <div className="article-list">
                <Header />

                {/* banner图片 */}
                <div className="article-banner">
                    <img src="http://localhost:3000/images/bk4.jpg" alt=""/>
                </div>

                <div className="article-list-wrapper">
                    {/* 筛选文章类型 */}
                    <div className="article-filter">
                        {
                            articleType.map((item, index) => (
                                <p className="filter-item" key={item.id}>{item.type}</p> 
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ArticleList