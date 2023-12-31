import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ModalForm, PageContainer, ProFormDateTimePicker, ProFormSelect, ProFormText, ProTable} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import {useRef, useState} from 'react';
import {history, useAccess} from 'umi';
import {deleteAssignment, insertAssignment, listAssignments, updateAssignment} from "@/services/ant-design-pro/api";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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
          // console.log(sort, filter);
          // await waitTime(2000);
          const assignmentList = await listAssignments(1n);
          return {
            data: assignmentList
          }
        }}

        editable={{
          type: 'single',
          onSave: async (key, record, originRow, newLineConfig) => {
            try {
              const result = await updateAssignment(record);
              // @ts-ignore
              if (result && result === true) {
                message.success("保存成功！")
                actionRef.current?.reload()
                return Promise.resolve()
              } else {
                throw new Error();
              }
            } catch (error) {
              message.error('保存失败，请重试！');
              return Promise.reject()
            }
          },
          onDelete: async (key, row) => {
            try {
              const result = await deleteAssignment(row.id);
              // @ts-ignore
              if (result && result === true) {
                message.success("删除成功！")
                actionRef.current?.reload()
                return Promise.resolve()
              } else {
                throw new Error();
              }
            } catch (error) {
              message.error('删除失败，请重试！');
              return Promise.reject()
            }
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

      <ModalForm
        title="发布作业"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value)
          try {
            const result = await insertAssignment(value as API.AssignmentList);
            // @ts-ignore
            if (result) {
              message.success("添加成功！")
              actionRef.current?.reload()
              return true
            } else {
              throw new Error();
            }
          } catch (error) {
            message.error('添加失败，请重试！');
            return true
          }
        }}
      >
        <ProFormText
          name="title"
          label="作业名称"
          rules={[
            {
              required: true,
              message: '请输入作业名称!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="description"
          label="作业描述"
          width="md"
        />
        <ProFormDateTimePicker
          name="startTime"
          label="作业开始时间"
          rules={[
            {
              required: true,
              message: '请选择作业开始时间!',
            },
          ]}
          width="md"
        />
        <ProFormDateTimePicker
          name="endTime"
          label="作业截止时间"
          rules={[
            {
              required: true,
              message: '请选择作业截止时间!',
            },
          ]}
          width="md"
        />
        <ProFormSelect
            name="assignmentType"
            label="作业类型"
            rules={[
              {
                required: true,
                message: '请选择作业类型!',
              },
            ]}
            options={[
              {
                label: '个人作业',
                value: 0,
              },
              {
                label: '小组作业',
                value: 1,
              },
            ]}
            width="md"
        />
      </ModalForm>
    </PageContainer>
  );
};
