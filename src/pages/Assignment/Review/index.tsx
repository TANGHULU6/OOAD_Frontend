import {useRef} from 'react';
import {Button, message, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {deleteAssignment, listAssignments} from '@/services/ant-design-pro/api';
import {history, useAccess} from 'umi';
import {ActionType, PageContainer, ProTable} from "@ant-design/pro-components";

const ReviewPage = ({assignmentId}) => {
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  return (
    <PageContainer>
      <ProTable<API.AssignmentList>
        columns={[
          {
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48,
            hideInTable: true,
          },
          {
            title: '标题',
            dataIndex: 'title',
            sorter: true,
          },
          {
            title: '作业描述',
            dataIndex: 'description',
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: '截止时间',
            dataIndex: 'endTime',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: '类型',
            dataIndex: 'assignmentType',
            valueType: 'select',
            valueEnum: {
              0: {
                text: '个人作业'
              },
              1: {
                text: '小组作业'
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
                  history.push(`/assignment/${record.id}`);
                }}
              >
                查看
              </a>,
              access.canTA && <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id.toString());
                }}
              >
                编辑
              </a>,
              access.canTA && <a
                key="review"
                style={{color: 'green'}}
                onClick={() => {
                  history.push(`/review/${record.id}`);
                }}
              >
                评阅
              </a>,
              access.canTA && <a
                key={"delete"}
                style={{color: 'red'}}
                onClick={() => {
                  Modal.confirm({
                    title: '删除作业',
                    content: '确定删除该作业吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                      try {
                        const result = await deleteAssignment(record.id);
                        // @ts-ignore
                        if (result && result === true) {
                          message.success("删除成功！")
                          action?.reload()
                          return Promise.resolve()
                        } else {
                          throw new Error();
                        }
                      } catch (error) {
                        message.error('删除失败，请重试！');
                        return Promise.reject()
                      }
                    },
                  });
                }}
              >
                删除
              </a>
            ].filter(Boolean),
          },
        ]}

        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params = {}, sort, filter) => {
          // await waitTime(2000);
          const assignmentList = await listAssignments(BigInt(courseId));
          return {
            data: assignmentList
          }
        }}

        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        search={false}
        pagination={false}
        dateFormatter="string"
        headerTitle="作业列表"
        toolBarRender={() => [
          access.canTA && <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              handleModalVisible(true)
            }}
            type="primary"
          >
            新建
          </Button>
        ]}
      />
    </PageContainer>
  );
};

export default ReviewPage;
