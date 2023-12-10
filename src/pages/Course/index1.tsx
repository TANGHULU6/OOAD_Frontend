import {PlusOutlined} from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProTable
} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import {useRef, useState} from 'react';
import {history, useAccess} from 'umi';
import {deleteCourse, insertCourse, listCourses, updateCourse} from "@/services/ant-design-pro/api";
import CourseOverview from '@/pages/courseOverview/CourseOverview';

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
  const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const access = useAccess();

  const handleViewCourse = (record) => {
    setSelectedCourseId(record.id);
    setViewModalVisible(true);
  };
  return (
    <PageContainer>
      <ProTable<API.CourseList>
        columns={[
          {
            title: '课程ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '课程名称',
            dataIndex: 'courseName',
            key: 'courseName',
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
                  // history.push(`/CourseOverview/${record.id}`);
                  handleViewCourse(record)
                }}
              >
                查看
              </a>,
              access.canAdmin && <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id.toString());
                }}
              >
                编辑
              </a>,
              access.canAdmin && <a
                key={"delete"}
                style={{color: 'red'}}
                onClick={() => {
                  Modal.confirm({
                    title: '删除课程',
                    content: '确定删除该课程吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                      try {
                        const result = await deleteCourse(record.id);
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
          const CourseList = await listCourses();
          return {
            data: CourseList
          }
        }}

        editable={{
          type: 'single',
          onSave: async (key, record, originRow, newLineConfig) => {
            try {
              const result = await updateCourse(record);
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
              const result = await deleteCourse(row.id);
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
        headerTitle="课程列表"
        toolBarRender={() => [
          access.canAdmin && <Button
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

      <Modal
        title="课程详情"
        visible={viewModalVisible}
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        {selectedCourseId && <CourseOverview id={selectedCourseId} />}
      </Modal>

      <ModalForm
        title="发布课程"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value)
          try {
            const result = await insertCourse(value as API.CourseList);
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
          name="courseName" // Changed from "title" to "courseName"
          label="课程名称"
          rules={[
            {
              required: true,
              message: '请输入课程名称!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="teacherName" // This remains the same, assuming the backend also expects "description"
          label="授课老师"
          width="md"
        />
        <ProFormText
          name="taIdList" // Changed from "CourseType" to "courseType" for consistency
          label="TA"
          rules={[
            {
              required: true,
              message: '请选择TA!',
            },
          ]}
          width="md"
        />
      </ModalForm>
    </PageContainer>
  );
};
