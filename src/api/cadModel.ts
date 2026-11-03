// src/api/cadModel.ts
import request from '@/utils/request';
import type { CadModel, PaginationResponse } from '@/types/entities';

export interface GetCadModelsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: string;
  tagId?: string;
  sortBy?: 'latest' | 'popular' | 'downloads';
}

// 获取图纸列表
export const getCadModelList = (params: GetCadModelsParams) => {
  return request.get<any, PaginationResponse<CadModel>>('/cad-models', { params });
};

export const getCadModelDetail = (id: string) => {
  return request.get<any, any>(`/cad-models/${id}`);
};

// 点赞
export const likeCadModel = (id: string) => {
  return request.post(`/cad-models/${id}/like`);
};

// 取消点赞
export const unlikeCadModel = (id: string) => {
  return request.delete(`/cad-models/${id}/like`);
};

// 收藏
export const favoriteCadModel = (id: string) => {
  return request.post(`/cad-models/${id}/favorite`);
};

// 取消收藏
export const unfavoriteCadModel = (id: string) => {
  return request.delete(`/cad-models/${id}/favorite`);
};
