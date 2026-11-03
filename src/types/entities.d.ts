// src/types/entities.d.ts

// src/types/entities.d.ts

// 通用的基础资源展示接口（未来不管是图纸、3D模型还是其他，满足这个结构就能用卡片）
export interface BaseResource {
  id: string;
  title: string;
  previewImageUrl: string | null;
  accessType: string;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
  user: {
    nickname: string;
    avatarUrl: string | null;
  };
}

// 完整的 CadModel 接口继承自 BaseResource
export interface CadModel extends BaseResource {
  slug: string;
  fileFormat: string | null;
  accessType: 'FREE' | 'POINTS' | 'PAID' | 'PRIVATE' | 'MEMBER';
  createdAt: string;
  tags: Array<{
    tag: {
      id: string;
      name: string;
    }
  }>;
}

// 分页响应体
export interface PaginationResponse<T> {
  list: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
