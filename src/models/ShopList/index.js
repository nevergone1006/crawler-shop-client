import React from 'React';
import moment from 'moment-timezone';
import { observable, computed, action } from 'mobx';
import ShopService from 'services/ShopList';
import { DATE_FORMAT_STRING, TIME_FORMAT_STRING } from 'constants/common.const';
import VipImage from 'assets/img/icon_vip3.png';
import BusinessImage from 'assets/img/icon_business_small.png';

class ShopStore {
	constructor() {
		this.service = ShopService;

		this.initData();
	}

	static columns = [
		{
			dataField: 'shopName',
			text: 'Tên cửa hàng',
			style: {minWidth: 250},
			// sort: true,
			formatter: (cell, row) => {
				return (
					<a
						href={row.shopUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={e => {
							e.stopPropagation();
						}}
					>
						{cell}
					</a>
				);
			},
		},
		{
			dataField: 'shopType',
			text: 'Loại',
			style: {minWidth: 110},
			// sort: true,
			formatter: (cell) => {
				const data = cell ? cell.toLowerCase() : '';
				if (data.includes('vip') || data.includes('business')) {
					const src = data.includes('business') ? BusinessImage : VipImage;
					return (<img src={src} style={{height: 20}}/>);
				}
				return '';
			},
		},
		{
			dataField: 'categories',
			text: 'Nhóm hàng',
			style: {minWidth: 200},
			// sort: true,
			formatter: (cell) => {
				return (
					<span>
						{cell.map(cate => (<div key={cate} style={{ marginBottom: 10 }}>{cate}</div>))}
					</span>
				);
			},
		},
		{
			dataField: 'shopStarted',
			text: 'Hoạt động',
			style: {minWidth: 100},
			// sort: true,
			formatter: (cell) => {
				return moment(cell).format(DATE_FORMAT_STRING);
			},
		},
		{
			dataField: 'shopAddress',
			text: 'Địa chỉ',
			// sort: true,
			style: {minWidth: 300},
		},
		{
			dataField: 'shopEmail',
			text: 'Email',
			// sort: true,
			style: {minWidth: 150},
		},
		{
			dataField: 'shopPhone',
			text: 'SĐT',
			// sort: true,
			style: {minWidth: 100},
		},
		{
			dataField: 'enterprisePit',
			text: 'Mã số thuế',
			// sort: true,
			style: {minWidth: 100},
		},
		{
			dataField: 'enterpriseType',
			text: 'Mô hình kinh doanh',
			// sort: true,
			style: {minWidth: 150},
		},
		{
			dataField: 'enterpriseName',
			// sort: true,
			text: 'Tên doanh nghiệp',
			style: {minWidth: 150},
		},
		{
			dataField: 'enterpriseStarted',
			// sort: true,
			text: 'Ngày hoạt động DN',
			style: {minWidth: 100},
		},
		{
			dataField: 'nameRepresent',
			// sort: true,
			text: 'Nguời đại diện',
			style: {minWidth: 150},
		},
		{
			dataField: 'enterpriseMarket',
			// sort: true,
			text: 'Thị trường',
			style: {minWidth: 150},
		},
		{
			dataField: 'enterpriseCategory',
			// sort: true,
			text: 'Ngành hàng doanh nghiệp',
			style: {minWidth: 150},
		},
		// {
		// 	dataField: 'enterpriseSize',
		// 	text: 'Nhân sự',
		// },
		// {
		// 	dataField: 'enterpriseTotal',
		// 	text: 'Khả năng cung cấp',
		// },
		{
			dataField: 'createdAt',
			text: 'Thời gian Crawle',
			style: {minWidth: 200},
			// sort: true,
			formatter: (cell) => {
				return moment(cell).format(TIME_FORMAT_STRING);
			},
		},
	]

	@observable shopList = [];

	@observable currentPage = 1;

	@observable pagesCount = 0;

	@observable limit = 10;

	@observable total = 0;

	@observable sort = { 'createdAt': -1 };

	@computed
	get query() {
		return {
			query: {
				$limit: this.limit,
				$skip: (this.currentPage - 1) * this.limit,
				$sort: this.sort,
			}
		};
	}

	@action
	handleChangePage = (_, index) => {
		const { sortField, page } = index;
		this.setProperties({
			currentPage: page,
			sort: {
				[sortField]: this.sort[sortField] === -1 ? 1 : -1,
			},
		});
		
		return this.initData();
	}

	@action
	handleOnSizePerPageChange = (size) => {
		this.setProperties({
			limit: size,
		});
		
		return this.initData();
	}

	@action
	initData = () => {
		this.service.getShopList(this.query).then(res => {
			const { data, total, limit } = res;
			this.setProperties({
				shopList: data,
				limit,
				pagesCount: Math.ceil(total/limit),
				total,
			});
		});
	}

	@action
	exportData = (event) => {
		event.preventDefault();
	}

	@action
	setProperties = (change = {}) => {
		Object.assign(this, change);
	}
}

export default ShopStore;
