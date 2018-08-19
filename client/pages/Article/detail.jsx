import React, { Component } from 'react';

import Header from '@components/Header/header'
import http from '@utils/http'
import './detail.less'


class ArticleDetail extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // 文章标题
            title: "",

            // 文章内容
            content: '',

            // 
        }
    }

    componentDidMount() {
        // 获取文章id
		let articleID = this.props.match.params.id ? this.props.match.params.id : ''

		// 根据文章id 获取文章内容
		http.post({
			url: "/article/getConetent",
			data: {
				id: articleID,
				// title: store.get('articleData').title ? store.get('articleData').title : ''
			}
		}).then(res => {
			if(res.code == 1){
				this.setState({
                    title: res.data.title,
                    content: res.data.content
				})

			}
		})
    }

    render() {
        const {title, content} = this.state;
        return(
            <div className="article-detail">
                <Header />

                <div className="detail-container">
                    
                    {/* 左侧作者信息 */}
                    <div className="author-info">
                        <img className="avatar" src="http://localhost:3000/images/classify2.jpg" alt=""/>
                        <p className="author-name">越祈</p>

                        {/* 相关文章 */}
                        <div className="relate-artile">
                            <p className="relate-artile-title">相关文章</p>
                            <p className="relate-article-item">这里是香瓜文章标题</p>
                            <p className="relate-article-item">这里是香瓜文章标题</p>
                            <p className="relate-article-item">这里是香瓜文章标题</p>
                            <p className="relate-article-item">这里是香瓜文章标题</p>
                        </div>
                    </div>

                     {/* 右侧文章内容 */}
                     <div className="contant-wrapper">
                        <p className="article-title">{ title }</p>

                        <div 
                          className="article-content"
                          dangerouslySetInnerHTML={{__html: content}}>
                        
                        </div>
                     </div>
                    
                </div> 
            </div>
        )
    }
}

export default ArticleDetail;