import {PlusOutlined} from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProFormDatePicker,
  ProFormText,
  ProFormTimePicker,
  ProTable
} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import {useRef, useState} from 'react';
import {deleteUser, insertUser, listUsersByParams, updateUser} from "@/services/ant-design-pro/api";

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

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    hideInTable: true,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '身份',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '学生'
      },
      1: {
        text: '教师助理'
      },
      2: {
        text: '教师'
      },
      3: {
        text: '管理员'
      }
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未指定'
      },
      1: {
        text: '男'
      },
      2: {
        text: '女'
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    hideInSearch: true,
    valueType: 'time',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    hideInSearch: true,
    valueType: 'time',
  },
  {
    title: 'operation',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a
        key={"delete"}
        style={{color: 'red'}}
        onClick={() => {
          Modal.confirm({
            title: '删除会议',
            content: '确定删除该会议吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
              try {
                const result = await deleteUser(record.id);
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
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  return (
    <PageContainer>
      <ProTable<API.CurrentUser>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          const roomList = await listUsersByParams(params);
          return {
            data: roomList
          }
        }}
        editable={{
          type: 'single',
          onSave: async (key, record, originRow, newLineConfig) => {
            try {
              const result = await updateUser(record);
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
              const result = await deleteUser(row.id);
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
        search={{
          labelWidth: 'auto',
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="会议列表"
        toolBarRender={() => [
          <Button
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
        title="添加会议"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value)
          try {
            const result = await insertUser(value as API.CurrentUser);
            // @ts-ignore
            if (result && result === true) {
              message.success("添加成功！")
              actionRef.current?.reload()
              return true
            } else {
              throw new Error();
            }
          } catch (error) {
            message.error('保存失败，请重试！');
            return true
          }
        }}
      >
        <ProFormText
          name="roomName"
          label="Room Name"
          rules={[
            {
              required: true,
              message: 'Room Name is required!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="department"
          label="Department"
          rules={[
            {
              required: true,
              message: 'Department is required!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: 'Type is required!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: 'Location is required!',
            },
          ]}
          width="md"
        />
        <ProFormDatePicker
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: 'Date is required!',
            },
          ]}
          width="md"
        />
        <ProFormTimePicker
          name="startTime"
          label="Start Time"
          rules={[
            {
              required: true,
              message: 'Start Time is required!',
            },
          ]}
          width="md"
        />
        <ProFormTimePicker
          name="endTime"
          label="End Time"
          rules={[
            {
              required: true,
              message: 'End Time is required!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="maxDuration"
          label="Max Duration"
          rules={[
            {
              required: true,
              message: 'Max Duration is required!',
            },
          ]}
          width="md"
        />
      </ModalForm>
    </PageContainer>
  );
};
