import React, { Component } from 'react';
import { DatePicker, Select } from 'antd';

import Header from '@components/Header/header'
import './edit.less'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const Option = Select.Option;


class EditArticle extends Component {
    render () {
        return(
            <div className="edit-article">
                <Header />

				{/* 编辑页面主体 */}
				<div className="edit-article-wrapper">

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
				</div>
            </div>
        )
    }
}

export default EditArticle;
