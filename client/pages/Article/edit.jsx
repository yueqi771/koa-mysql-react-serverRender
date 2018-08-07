import React, { Component } from 'react';
import { DatePicker, Select, Icon } from 'antd';

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
			currentType: ''
		}

		this.changeType = this.changeType.bind(this);
		this.changeTime = this.changeTime.bind(this);
	}

	componentDidMount() {


		// // 获取文章类型
		// http.post({
		// 	url: "/article/save",
		// 	data: {
		// 		title: "第一篇测试文章",
		// 		thumb: "123",
		// 		description: "sdf",
		// 		type: 1,
		// 		uid: 1,
		// 		content: "这里是内容",
		// 		addtime: "23234"
		// 	}
		// }).then(res => {
		// 	console.log(res)
		// })

		// 实例化editor;
		var Editor = window.wangEditor;
		window.editorInstance = new Editor('#toolbar', '#editor');
		editorInstance.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        editorInstance.create()
	}

	// 点击保存到本地
	saveAtLocal() {
		console.log(editorInstance.txt.html())
	}

	// 修改文章类型
	changeType(value) {
		this.setState({
			currentType: value.key
		})
	}

	// 保存选中的时间
	changeTime(date, dateString) {
		console.log(dateString);
	}

    render () {
		const { articleType } = this.state
        return(
            <div className="edit-article">
                <Header />

				{/* 编辑页面主体 */}
				<div className="edit-article-wrapper">
					{/* 富文本编辑器标题 */}
					<div id="toolbar" className="toolbar"></div>

					{/* 输入标题 */}
					<div className="title-wrapper">
						<input type="text" placeholder="请输入标题" className="title-input"  />
					</div>

					{/* 选择日期, 选择类型 */}
					<div className="article-type">
						<div className="article-type-item">
							<DatePicker className="article-date" onChange={this.changeTime} />
						</div>

						<div className="article-type-item">
							<Select placeholder="文章类型" labelInValue onChange={this.changeType} style={{ width: '100%' }} >
								{
									articleType.map((item) => (
										<Option key={item.id} value={item.id}>{ item.type }</Option>
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
						<Button text="提交" loading={false} handleClick={e => console.log('提交')} />
					</div>
				</div>
            </div>
        )
    }
}

export default EditArticle;
