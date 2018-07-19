import React, { Component } from 'react';
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
    constructor(props, context) {
        super(props, context);

        this.state = {
            // banner标题
            bannerText1: "",
            bannerText2: ""
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


    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(this.props, nextProps) && _.isEqual(this.state, nextState)) {
            return false
        }
        return true
    }


    render() {
        const { bannerText1, bannerText2 } = this.state;
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
                                <div className="swiper-slide">Slide 1</div>
                                <div className="swiper-slide">Slide 2</div>
                                <div className="swiper-slide">Slide 3</div>
                                <div className="swiper-slide">Slide 4</div>
                                <div className="swiper-slide">Slide 5</div>
                                <div className="swiper-slide">Slide 6</div>
                                <div className="swiper-slide">Slide 7</div>
                                <div className="swiper-slide">Slide 8</div>
                                <div className="swiper-slide">Slide 9</div>
                                <div className="swiper-slide">Slide 10</div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>

                </div>


                
            </div>
        ) 
    }
}


export default Index;