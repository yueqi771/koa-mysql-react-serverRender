import React, { Component } from 'react';
import { DatePicker, Select, Icon, message } from 'antd';
import moment from 'moment';

import { Button } from '@components/Button/button';
import Header from '@components/Header/header'
import http from '@utils/http'
import './edit.less'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;


class EditArticle extends Component {
	constructor(props, context) {
		super(props, context)

		this.state = {
			// 输入的文章标题
			title: "",

			// 文章id
			articleId: "",

			// 编辑文章的时间
			editTime: new Date().getTime(),

			// 文章类型数组
			articleType: [
				{ type: 'javaScript设计模式', id: 1 },
				{ type: 'mysql', id: 2 },
				{ type: 'node', id: 3 },
				{ type: 'vue', id: 4 },
				{ type: 'react', id: 5 },
				{ type: 'HTTP', id: 6 },

			],

			// 选中的文章类型
			currentType: {
				label: "javaScript设计模式",
				key: '1'
			}
		}

		this.changeType = this.changeType.bind(this);
		this.changeTime = this.changeTime.bind(this);
	}

	componentDidMount() {
		// 获取文章id
		let articleID = this.props.match.params.id ? this.props.match.params.id : ''

		// 实例化editor;
		var Editor = window.wangEditor;
		window.editorInstance = new Editor('#toolbar', '#editor');
		editorInstance.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
		editorInstance.create()

		// 根据文章id 获取文章内容
		http.post({
			url: "/article/getConetent",
			data: {
				id: articleID,
				// title: store.get('articleData').title ? store.get('articleData').title : ''
			}
		}).then(res => {
			if(res.code == 1){
				// 展示上次编辑的内容
				editorInstance.txt.html(res.data.content);

				this.setState({
					title: res.data.title,
					articleId: res.data.id
				})

			}
		})

	}

	// 点击保存到本地
	saveAtLocal() {
		const { title, editTime, currentType } = this.state;
		let articleData = {
			title: title,
			editTime: editTime,
			currentType: currentType,
			content: editorInstance.txt.html()
		};

		store.set('articleData', articleData);

		message.success('已保存在本地')
	}

	// 修改文章类型
	changeType(value) {
		console.log(value)
		this.setState({
			currentType: value
		})
	}

	// 保存选中的时间
	changeTime(date, dateString) {
		this.setState({
			editTime: dateString
		})
	}

	// 保存文章
	saveArticle() {
		const { title, editTime, currentType, articleId } = this.state;
		if(!editTime) { message.error('请选择时间'); return }
		if(title == ''){message.error('请填写文章标题'); return }

		let content = editorInstance.txt.html();
		http.post({
			url: "/article/save",
			data: {
				id: articleId,
				title: title,
				thumb: "123",
				description: "sdf",
				type: currentType.key,
				uid: 1,
				content: content,
				addtime: new Date(editTime).getTime()
			}
		}).then(res => {
			if(res.code == 1){
				message.success(res.message)
			}else{
				message.error(res.message)
			}
		})
	}

    render () {
		const { articleType, title, editTime, currentType } = this.state;
        return(
            <div className="edit-article">
                <Header />

				{/* 编辑页面主体 */}
				<div className="edit-article-wrapper">
					{/* 富文本编辑器标题 */}
					<div id="toolbar" className="toolbar"></div>

					{/* 输入标题 */}
					<div className="title-wrapper">
						<input
						  value={title}
						  type="text"
						  placeholder="请输入标题"
						  className="title-input"
						  onChange={e => { this.setState({title: e.target.value}) }}  />
					</div>

					{/* 选择日期, 选择类型 */}
					<div className="article-type">
						<div className="article-type-item">
							{
								console.log(editTime)
							}
							<DatePicker
								className="article-date" onChange={this.changeTime} />
						</div>

						<div className="article-type-item">
							<Select
							  placeholder="文章类型"
							  labelInValue
							  onChange={this.changeType}
							  style={{ width: '100%' }} >
								{
									articleType.map((item) => (
										<Option key={item.id} value={item.type}>{ item.type }</Option>
									))
								}

							</Select>
						</div>

					</div>

					{/* 富文本编辑器 */}
					<div id="editor" className="editor-wrapper"></div>

				</div>

				{/* 保存按钮 */}
				<p className="save-edit" onClick={e => {this.saveAtLocal()}}>
					<Icon type="save" />
				</p>

				{/* 确认提交按钮 */}
				<div className="container">
					<div className="submit-article">
						<Button text="提交" loading={false} handleClick={e => this.saveArticle()} />
					</div>
				</div>
            </div>
        )
    }
}

export default EditArticle;
