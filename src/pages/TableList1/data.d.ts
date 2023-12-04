export type TableListItem = {
  id: number;
  courseName: string;
  teacherId?: number | null;
  isDeleted?: boolean | null;
  createTime?: Date | null;
  updateTime?: Date | null;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

// 根据需要调整 TableListParams
export type TableListParams = {
  courseName?: string;
  teacherId?: number;
  pageSize?: number;
  currentPage?: number;
  // 添加其他可能的查询参数
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
