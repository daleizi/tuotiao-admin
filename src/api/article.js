// 文章例表

import request from "@/utils/request.js";

/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/mp/v1_0/articles",
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  });
};
/**
 * 获取文章频道
 */
export const getChannels = () => {
  return request({
    method: "GET",
    url: "/mp/v1_0/channels"
  });
};
/**
 * 发表文章
 */
export const addArticle = (data, draft = false) => {
  return request({
    method: "POST",
    url: "/mp/v1_0/articles",
    params: {
      draft // 是否成为草稿
    },
    data
  });
};
/**
 * 删除文章
 */
export const deleteArticles = id => {
  return request({
    method: "DELETE",
    url: "/mp/v1_0/articles/" + id
  });
};
/**
 * 编辑文章
 */
export const updateArticle = (id, data, draft = false) => {
  return request({
    method: "PUT",
    url: "/mp/v1_0/articles/" + id,
    params: {
      draft // 是否成为草稿
    },
    data
  });
};
/**
 * 获取指定文章
 */
export const getArticle = id => {
  return request({
    method: "GET",
    url: "/mp/v1_0/articles/" + id
  });
};
/**
 * 修改文章评论状态
 */
export const uploadCommentStatus = (id, status) => {
  return request({
    method: "PUT",
    url: "/mp/v1_0/comments/status",
    params: {
      article_id: id
    },
    data: {
      allow_comment: status
    }
  });
};
