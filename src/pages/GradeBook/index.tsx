import {useRef} from 'react';
import {listReviews} from '@/services/ant-design-pro/api';
import {history} from 'umi';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";
import {useParams} from "react-router-dom";

const ReviewPage = () => {
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  const {assignmentId} = useParams()
  return (
    <PageContainer>
      <ProTable<API.ReviewList>
        columns={[
          {
            dataIndex: 'submissionId',
            valueType: 'indexBorder',
            width: 48,
            hideInTable: true,
          },
          {
            title: '提交者学工号',
            dataIndex: 'submitterSid',
            sorter: true,
          },
          {
            title: '提交者姓名',
            dataIndex: 'submitterName',
            sorter: true,
          },
          {
            title: '提交时间',
            dataIndex: 'submitTime',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: '分数',
            dataIndex: 'score',
            sorter: true,
          },
          {
            title: '评阅状态',
            dataIndex: 'isReviewed',
            sorter: true,
            valueType: 'select',
            valueEnum: {
              true: {
                status: 'success',
                text: '已评阅'
              },
              false: {
                status: 'error',
                text: '未评阅'
              }
            }
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
              <a
                key="view"
                onClick={() => {
                  // 这里添加你的查看详情逻辑，比如跳转到详情页面
                  history.push(`/submission/${record.submissionId}`);
                }}
              >
                评阅
              </a>,
            ].filter(Boolean),
          },
        ]}

        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params = {}, sort, filter) => {
          const assignmentList = await listReviews(assignmentId);
          return {
            data: assignmentList
          }
        }}

        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="submissionId"
        search={false}
        pagination={false}
        dateFormatter="string"
        headerTitle="评阅列表"
        toolBarRender={() => []}
      />
    </PageContainer>
  );
};

export default ReviewPage;
