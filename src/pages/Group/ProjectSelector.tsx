import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ModalForm, PageContainer, ProFormDateTimePicker, ProFormText, ProTable} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {history, useAccess} from 'umi';
import {deleteProject, insertProject, listProjects, updateProject} from "@/services/ant-design-pro/api";

interface ProjectListProps {
  courseId: number; // 定义传入的 id 属性
}

const ProjectList: React.FC<ProjectListProps> = ({courseId}) => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const access = useAccess();
  return (
    <PageContainer>
      <ProTable<API.ProjectList>
        columns={[
          {
            dataIndex: 'id',
            valueType: 'indexBorder',
            width: 48,
            hideInTable: true,
          },
          {
            title: '项目名称',
            dataIndex: 'projectName',
            sorter: true,
          },
          {
            title: '项目描述',
            dataIndex: 'description',
          },
          {
            title: '组队截止时间',
            dataIndex: 'groupDeadline',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: '项目截止时间',
            dataIndex: 'endDeadline',
            valueType: 'dateTime',
            sorter: true,
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
                  history.push(`/UserGroup/${record.id}`);
                }}
              >
                进入
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
          const projectList = await listProjects(BigInt(1));
          return {
            data: projectList
          }
        }}

        editable={{
          type: 'single',
          onSave: async (key, record, originRow, newLineConfig) => {
            try {
              const result = await updateProject(record);
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
              const result = await deleteProject(row.id);
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
        headerTitle="项目列表"
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
        title="添加项目"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value)
          try {
            const result = await insertProject(courseId, (value as API.ProjectList));
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
          name="projectName"
          label="项目名称"
          rules={[
            {
              required: true,
              message: '请输入项目名称!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="description"
          label="项目描述"
          width="md"
        />
        <ProFormDateTimePicker
          name="groupDeadline"
          label="组队截止时间"
          rules={[
            {
              required: true,
              message: '请选择组队截止时间!',
            },
          ]}
          width="md"
        />
        <ProFormDateTimePicker
          name="endDeadline"
          label="项目截止时间"
          rules={[
            {
              required: true,
              message: '请选择项目截止时间!',
            },
          ]}
          width="md"
        />
      </ModalForm>
    </PageContainer>
  );
}

export default ProjectList;
