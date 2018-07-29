import React, { Component } from 'react';
import { Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import Header from '@components/Header/header'
import Star from '@components/Star/star'
import "./index.less"


@inject((store) => {
    return {
        // userInfo: store.state.userInfo
    }
}) @observer
class Index extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) {
            return false
        }

        return true
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            // banner标题
            bannerText1: "",
            bannerText2: "",

            // 文章模块
            articleClassify: [
                {
                    id: "asdd2454cvgrty",
                    thumb: "http://localhost:3000/images/classify10.jpg",
                    title: "MySql",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "as123Asdfcvgrty",
                    thumb: "http://localhost:3000/images/classify1.jpg",
                    title: "javaScript设计模式",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "asdfgdfgvgrty",
                    thumb: "http://localhost:3000/images/classify2.jpg",
                    title: "React",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "asdd24ghcvrty",
                    thumb: "http://localhost:3000/images/classify3.jpg",
                    title: "Vue",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "asdtyrtcvgrty",
                    thumb: "http://localhost:3000/images/classify4.jpg",
                    title: "Node",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "avbns4cvgrty",
                    thumb: "http://localhost:3000/images/classify5.jpg",
                    title: "http模块",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "gsdcccvgrty",
                    thumb: "http://localhost:3000/images/classify6.jpg",
                    title: "js模块",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
                {
                    id: "gtgttrrcvgrty",
                    thumb: "http://localhost:3000/images/classify7.jpg",
                    title: "weex模块",
                    description: "mysql常用命令， mysql 连表查询",
                    article_num: 30,
                },
            ]
        }
    }

    async componentDidMount() {
        // 实例化swiper
        let swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 30,
            freeMode: false,
     
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
        });

        await this.textAnimate('bannerText1' , '听见薄雾微光');
        await setTimeout( () => {
            this.textAnimate('bannerText2', '---王东旭的个人博客')
        }, 1000)
    }

    // 文字逐渐出现效果
    textAnimate = (key, text) => {
        let i = 0, 
            showText = text;
        let timer = setInterval(() => {
            this.setState({
                [key]: text.substring(0, i)
            }, () => {
                i++;
                if(this.state[key] == showText){
                    clearInterval(timer);
                };
            })
        }, 160);
    }

    // 渲染文章模块
    renderClassify = (data) => {
        console.log(data)
        return (
            <div className="swiper-slide" key={data.id}>
                <div className="effect-milo">
                    <img src={data.thumb} alt="img03"/>
                    <div  className="effect-item">
                        <h2 className="item-title">{ data.title }</h2>
                        <p className="item-description">{ data.description }</p>
                        <a className="item-link" href="#">View more</a>
                    </div>			
                </div>
            </div>
        )
    }

    render() {
        const { bannerText1, bannerText2, articleClassify } = this.state;
        return(
            <div className="index"> 
                <Header />

                {/* 流星背景 */}
                <Star />

                {/* 主页居中容器 */}
                <div className="index-container">
                    {/* 主页banner */}
                    <div className="banner">
                        {/* banner搜索按钮 */}
                        <div className="search">
                            <input type="search" className="search-input" />
                        </div> 

                        <p className="banner-text">{ bannerText1 }</p>
                        <p className="banner-text2">{ bannerText2 }</p>

                    </div> 

                    {/* 文章模块 */}
                    <div className="article-classify">
                        <p className="article-title">· 止 境</p>

                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {
                                    articleClassify && 
                                    articleClassify.map((item, index) =>  
                                        this.renderClassify(item) 
                                    )
                                }
                                
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    
                    {/* 推荐文章 */}
                    <div className="recommend">
                        <p className="recommend-title">· 推 荐</p>
                        
                        <div className="recommend-wrapper">
                            {/* 左侧推荐文章 */}
                            <div className="recommend-article">
                                <div className="article-list">
                                    {/* 左侧文章封面 */}
                                    <div className="list-left">
                                        <img src="http://localhost:3000/images/classify9.jpg" alt=""/>

                                        <div className="article-list-info">
                                            <p className="info-item">
                                                <Icon type="tag" className="icon tag" />
                                                <span className="text">css | html</span>
                                            </p>

                                            <p className="info-item">
                                                <Icon type="dashboard" className="icon time" />
                                                <span className="text">2018/2/2</span>
                                            </p>

                                            <p className="info-item">
                                                <Icon type="eye-o" className="icon saw" />
                                                <span className="text">浏览(300)</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* 右侧文章内容 */}
                                    <div className="list-right">
                                        <h3 className="article-title">这里是文章标题</h3>
                                        <p className="article-content">这里是文章内容这里是文章内容这里是文章内容这里是文章内容这里是文章内容这里是文章内容</p> 
                                        {/* 阅读原文 */}
                                        <p className="read-orign">阅读原文</p>
                                    </div>

                                    
                                </div>
                            </div>

                            {/* 右侧个人信息 */}
                            <div className="base-info"></div>
                        </div> 
                        
                    
                    </div>
                </div>


                
            </div>
        ) 
    }
}


export default Index;