import request from '@/utils/request'

export function aliGoodsPagedList(params) {
	return request({
		url: '/Paged/AliGoodsPagedList',
		method: 'post',
		data: params
	})
}
