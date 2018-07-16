import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Header from '@components/Header/header'
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

                {/* 主页banner */}
                <div className="banner">
                    <p className="banner-text">{ bannerText1 }</p>
                    <p className="banner-text2">{ bannerText2 }</p>

                </div> 
                <div className="star-wrapper">
                    <span className="star star01"></span>
                    <span className="star star02"></span>
                    <span className="star star03"></span>
                    <span className="star star04"></span>
                    <span className="star star05"></span>
                    <span className="star star06"></span>
                    <span className="star star07"></span>
                    <span className="star star08"></span>
                    <span className="star star09"></span>
                    <span className="star star10"></span>
                    <span className="star star11"></span>
                    <span className="star star12"></span>
                    <span className="star star13"></span>
                    <span className="star star14"></span>
                    <span className="star star15"></span>
                    <span className="star star16"></span>
                    <span className="star star17"></span>
                    <span className="star star18"></span>
                    <span className="star star19"></span>
                    <span className="star star20"></span>
                    <span className="star star21"></span>
                    <span className="star star22"></span>
                    <span className="star star23"></span>
                    <span className="star star24"></span>
                </div>
            </div>
        ) 
    }
}


export default Index;