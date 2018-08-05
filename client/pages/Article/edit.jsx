import React, { Component } from 'react';
import { DatePicker, Select } from 'antd';

import { Button } from '@components/Button/button';
import Header from '@components/Header/header'
import http from '@utils/http'
import './edit.less'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;


class EditArticle extends Component {
	constructor(props, context) {
		super(props, context)
	}

	componentDidMount() {
		

		// 获取文章类型
		http.post({
			url: "/article/save",
			data: {
				title: "第一篇测试文章", 
				thumb: "123", 
				description: "sdf", 
				type: "23234", 
				uid: 1, 
				content: "这里是内容", 
				addtime: "23234" 
			}
		}).then(res => {
			console.log(res)
		})

		// 实例化editor; 
		let Editor = window.wangEditor,
			instance = new Editor('#toolbar', '#editor');
		instance.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
        instance.create()
	}

    render () {
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
							<DatePicker className="article-date" />
						</div>

						<div className="article-type-item">
							<Select placeholder="文章类型" style={{ width: '100%' }} >
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="disabled" disabled>Disabled</Option>
								<Option value="Yiminghe">yiminghe</Option>
							</Select>
						</div>
						
					</div>

					{/* 富文本编辑器 */}
					<div id="editor" className="editor-wrapper"></div>
					
				</div>

				{/* 保存按钮 */}
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
