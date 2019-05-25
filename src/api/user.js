/**
 * Created by hbb on 2018/10/19.
 */

import seriver from '@/utils/request';

//登录
export function login(params) {
  return seriver({
    url: '/user/login',
    method: 'post',
    data: params
  });
}

//注册
export function signup(params) {
  return seriver({
    url: '/user/register',
    method: 'post',
    data: params
  });
}

//退出登录
export function signout(params) {
  return seriver({
    url: '/user/logout',
    method: 'get',
  });
}
//获取首页所有文章
export function getAllPage(params, isMy) {
  if (!isMy) {
    return seriver({
      url: '/post/list',
      method: 'get',
      params: params,
    });
  } else {
    return seriver({
      url: '/post/myList',
      method: 'get',
      params: params,
    });
  }
}
//获取首页所有文章
export function getAllCategory(params, type) {
  return seriver({
    url: '/manage/category/parentId/' + params,
    method: 'get'
  });
}


//评论
export function comment(params) {
  return seriver({
    url: '/comment/saveOrUpdate',
    method: 'post',
    data: params,
  });
}
//评论分页
export function commentPage(params) {
  return seriver({
    url: '/comment/list',
    method: 'get',
    params: params,
  });
}


//发表文章
export function create(params) {
  return seriver({
    url: '/post/saveOrUpdate',
    method: 'post',
    data: params,
  });
}
//编辑文章
export function edit(params) {
  return seriver({
    url: '/posts/edit',
    method: 'put',
    data: params,
  });
}
//获取文章详情
export function getDetail(id) {
  return seriver({
    url: '/post/detail/' + id,
    method: 'get',
  });
}
//推荐
export function postRecommend(params) {
  return seriver({
    url: '/manage/post/setIsRecommend',
    method: 'post',
    data: params
  });
}
//取消推荐
export function postCancelRecommend(params) {
  return seriver({
    url: '/manage/post/setIsRecommend',
    method: 'post',
    data: params
  });
}
//获取用户详情

export function get_userInfo(params) {
  return seriver({
    url: '/user/getUserInfo',
    method: 'get',
  });
}
//修改用户
export function put_UserInfo(params) {
  return seriver({
    url: '/user/updateUserInfo',
    method: 'put',
    data: params
  });
}
//修改密码
export function put_updateUserPs(params) {
  return seriver({
    url: '/user/resetPassword',
    method: 'put',
    data: params
  });
}

