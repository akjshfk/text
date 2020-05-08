export const api = require('./api.js');
//用户登录
export const wx_login = (params) => api.post('m=App&c=Login&a=wx_login', params);
//首页
export const index = (params) => api.post('m=App&c=Index&a=index', params);

//门店列表 shop_list
export const shop_list = (params) => api.post('m=App&c=Index&a=shop_list', params);

//自助查寻列表 article_list
export const article_list = (params) => api.post('m=App&c=Article&a=article_list', params);

//自助查寻列表文章 article_list_article
export const article_list_article = (params) => api.post('m=App&c=Article&a=article_list_article', params);

//文章详情 article_info
export const article_info = (params) => api.post('m=App&c=Article&a=article_info', params);

//活动列表 activities
export const activities = (params) => api.post('m=App&c=Article&a=activities', params);

//活动列表 new_activities_list
export const new_activities_list = (params) => api.post('m=App&c=Activities&a=new_activities_list', params);

//关于我们 about
export const about = (params) => api.post('m=App&c=Article&a=about', params);

//优惠劵列表 coupon_list
export const coupon_list = (params) => api.post('m=App&c=Index&a=coupon_list', params);

//领取优惠劵 coupon_get
export const coupon_get = (params) => api.post('m=App&c=Index&a=coupon_get', params);

//分销商申请 Application
export const Application = (params) => api.post('m=App&c=Appointment&a=Application', params);

//地址列表 address_list
export const address_list = (params) => api.post('m=App&c=Member&a=address_list', params);

//添加地址 add_address
export const add_address = (params) => api.post('m=App&c=Member&a=add_address', params);

//编辑地址 address_edit
export const address_edit = (params) => api.post('m=App&c=Member&a=address_edit', params);

//地址详情 address_info
export const address_info = (params) => api.post('m=App&c=Member&a=address_info', params);

//默认地址 address_default
export const address_default = (params) => api.post('m=App&c=Member&a=address_default', params);

//删除地址 address_Delete
export const address_Delete = (params) => api.post('m=App&c=Member&a=address_Delete', params);

//商品列表 item_list
export const item_list = (params) => api.post('m=App&c=Appointment&a=item_list', params);

//用户个人中心 user_index
export const user_index = (params) => api.post('m=App&c=Index&a=user_index', params);

//商品详情 item_info
export const item_info = (params) => api.post('m=App&c=Appointment&a=item_info', params);

//用户信息更新 update_user_info
export const update_user_info = (params) => api.post('m=App&c=Login&a=update_user_info', params);

//活动文章 activities_info
export const activities_info = (params) => api.post('m=App&c=Article&a=activities_info', params);

//点赞文章 article_collect
export const article_collect = (params) => api.post('m=App&c=Article&a=article_collect', params);

//取消点赞文章 cancel_collect
export const cancel_collect = (params) => api.post('m=App&c=Article&a=cancel_collect', params);

//点赞活动文章 activities_collect
export const activities_collect = (params) => api.post('m=App&c=Article&a=activities_collect', params);

//发起预约 Appointment_cleaning
export const Appointment_cleaning = (params) => api.post('m=App&c=Appointment&a=Appointment_cleaning', params);

//验证优惠码 codes
export const codes = (params) => api.post('m=App&c=Appointment&a=codes', params);

//提交订单 atOnceOrder
export const atOnceOrder = (params) => api.post('m=App&c=Appointment&a=atOnceOrder', params);

//活动文章取消点赞 cancel_activities_collect
export const cancel_activities_collect = (params) => api.post('m=App&c=Article&a=cancel_activities_collect', params);

//判断用户申请成为分销商 Judgment_application
export const Judgment_application = (params) => api.post('m=App&c=Appointment&a=Judgment_application', params);

//我的订单列表 AppointmentList
export const AppointmentList = (params) => api.post('m=App&c=Member&a=AppointmentList', params);

//我的订单详情 checkOrder
export const checkOrder = (params) => api.post('m=App&c=Member&a=checkOrder', params);

//发表评价 appraise_order
export const appraise_order = (params) => api.post('m=App&c=Member&a=appraise_order', params);

//发表评价 process_Wx_pay
export const process_Wx_pay = (params) => api.post('m=App&c=Appointment&a=process_Wx_pay', params);

//我的   首页  分销商今日成交订单数量    订单金额 partner_index
export const partner_index = (params) => api.post('m=App&c=Partner&a=partner_index', params);

//分销商界面首页 partner_info
export const partner_info = (params) => api.post('m=App&c=Partner&a=partner_info', params);

//我的团队 my_partner
export const my_partner = (params) => api.post('m=App&c=Partner&a=my_partner', params);

//我的二维码 get_qrcode
export const get_qrcode = (params) => api.post('m=App&c=Partner&a=get_qrcode', params);

//解除绑定银行卡 get_qrcode
export const del_bank = (params) => api.post('m=App&c=Distribution&a=del_bank', params);

//添加银行卡 add_bank
export const add_bank = (params) => api.post('m=App&c=Distribution&a=add_bank', params);

//展示银行卡 select_bank
export const select_bank = (params) => api.post('m=App&c=Distribution&a=select_bank', params);

//提现余额提示 show
export const show = (params) => api.post('m=App&c=Distribution&a=show', params);

//提现余额提示 该订单可用优惠券
export const Coupons_available = (params) => api.post('m=App&c=Appointment&a=Coupons_available', params);

//银行卡列表 my_bank
export const my_bank = (params) => api.post('m=App&c=Distribution&a=my_bank', params);

//添加 add_MyBank
export const add_MyBank = (params) => api.post('m=App&c=Distribution&a=add_MyBank', params);

//添加银行卡之前操作 before_add_bank
export const before_add_bank = (params) => api.post('m=App&c=Distribution&a=before_add_bank', params);

//添加银行卡之前操作 commission_request
export const commission_request = (params) => api.post('m=App&c=Distribution&a=commission_request', params);

//佣金明细 commission_detail
export const commission_detail = (params) => api.post('m=App&c=Distribution&a=commission_detail', params);


//预约支付回调（确定支付以及改变订单状态） wx_notify_dec
export const wx_notify_dec = (params) => api.post('m=App&c=Appointment&a=wx_notify_dec', params);

//订单详情  partner_list
export const partner_list = (params) => api.post('m=App&c=Partner&a=partner_list', params);

//意见反馈  Feedback
export const Feedback = (params) => api.post('m=App&c=Member&a=Feedback', params);

//我的产品  my_PurchaseRecord
export const my_PurchaseRecord = (params) => api.post('m=App&c=Member&a=my_PurchaseRecord', params);

//添加商品需要展示的数据  by_item_list
export const by_item_list = (params) => api.post('m=App&c=Appointment&a=by_item_list', params);

//解密手机  mobile
export const mobile = (params) => api.post('m=App&c=Member&a=mobile', params);

//个人资料  my_information
export const my_information = (params) => api.post('m=App&c=Member&a=my_information', params);

//信息提交 edit_information
export const edit_information = (params) => api.post('m=App&c=Member&a=edit_information', params);

//点击接口 dianji
export const dianji = (params) => api.post('m=App&c=Member&a=dianji', params);

//客服联系电话 tel
export const tel = (params) => api.post('m=App&c=Member&a=tel', params);

//活动详情 new_activities_info
export const new_activities_info = (params) => api.post('m=App&c=Activities&a=new_activities_info', params);

//开团嗨抽奖 new_regiment
export const new_regiment = (params) => api.post('m=App&c=Activities&a=new_regiment', params);

//查看更多 look_list
export const look_list = (params) => api.post('m=App&c=Activities&a=look_list', params);

//新增团员 new_member
export const new_member = (params) => api.post('m=App&c=Activities&a=new_member', params);

//取消订单 cancel_order
export const cancel_order = (params) => api.post('m=App&c=Member&a=cancel_order', params);

//删除订单 delete_es
export const delete_es = (params) => api.post('m=App&c=Member&a=delete', params);

//门店查询 shop_grabble
export const shop_grabble = (params) => api.post('m=App&c=Index&a=shop_grabble', params);

//门店查询 uoload_photo
export const uoload_photo = (params) => api.post('m=App&c=order&a=uoload_photo', params);

