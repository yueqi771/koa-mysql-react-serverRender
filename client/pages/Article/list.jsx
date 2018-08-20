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
        document.getElementById('article_banner_img').style.width = document.documentElement.clientWidth;

        // 监听屏幕尺寸变化， 调整banner大小
        window.addEventListener('resize', () => {
            let element = document.getElementById('article_banner_img');
             element.style.width = document.documentElement.clientWidth;
            console.log(element.offsetWidth)
        })

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
                    <img id="article_banner_img" src="http://localhost:3000/images/bk4.jpg" alt=""/>
                </div>

                <div className="article-list-wrapper">
                    {/* 筛选文章类型 */}
                    <div className="article-filter">
                        <p className="filter-classify">栏目: </p>
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