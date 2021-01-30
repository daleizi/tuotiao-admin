/**
 * 素材模块
 */

import request from "@/utils/request.js";
/**
 * 上传图片素材
 */
export const uploadImage = data => {
  return request({
    method: "POST",
    url: "/mp/v1_0/user/images",
    data
  });
};
/**
 * 获取图片素材
 */
export const getImages = params => {
  return request({
    method: "GET",
    url: "/mp/v1_0/user/images",
    params
  });
};
/**
 * 删除素材
 */
export const deleteImages = id => {
  return request({
    method: "DELETE",
    url: "/mp/v1_0/user/images/" + id
  });
};
/**
 * 收藏素材
 */
export const startImages = (id, collect) => {
  return request({
    method: "PUT",
    url: "/mp/v1_0/user/images/" + id,
    data: {
      collect
    }
  });
};
