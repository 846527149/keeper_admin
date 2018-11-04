import request from '@/utils/request'
/**
 * 获取阿里商品
 *
 * @author houyongwei
 * @date 2018-11-04
 * @export
 * @param {*} params
 * @returns
 */
export function aliGoodsPagedList(params) {
	return request({
		url: '/Paged/AliGoodsPagedList',
		method: 'post',
		data: params
	})
}
