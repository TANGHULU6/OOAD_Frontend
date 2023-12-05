import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, PageContainer, ProFormDateTimePicker, ProFormText, ProTable } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import { useRef, useState } from 'react';
import { history, useAccess } from 'umi';
import { deleteCourse, insertCourse, listCourses, updateCourse } from "@/services/ant-design-pro/api";

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
            <ProTable<API.CourseList>
                columns={[
                    {
                        dataIndex: 'id',
                        valueType: 'indexBorder',
                        width: 48,
                        hideInTable: true,
                    },
                    {
                        title: '课程名称',
                        dataIndex: 'courseName',
                        sorter: true,
                    },
                    // Adjust or add other relevant columns for course information
                    {
                        title: '操作',
                        valueType: 'option',
                        key: 'option',
                        render: (text, record, _, action) => [
                            <a
                                key="view"
                                onClick={() => {
                                    // Adjust the detail view logic for course
                                    history.push(`/course-page/${record.id}`);
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
                                        title: '删除课程',
                                        content: '确定删除该课程吗？',
                                        okText: '确认',
                                        cancelText: '取消',
                                        onOk: async () => {
                                            try {
                                                const result = await deleteCourse(record.id);
                                                if (result === true) {
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
                // ... other ProTable configurations
                request={async (params = {}, sort, filter) => {
                    // Adjust the request logic to fetch course data
                    const courseList = await listCourses();
                    return {
                        data: courseList
                    }
                }}
                editable={{
                    // Adjust the editable logic for courses
                    // ...
                }}
                // ... other configurations
            />

            <ModalForm
                title="添加课程"
                // ... other configurations for ModalForm
                onFinish={async (value) => {
                    try {
                        const result = await insertCourse(value as API.CourseList);
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
                    name="courseName"
                    label="课程名称"
                    // ... other field configurations
                />
                // Add other course-specific fields as necessary
            </ModalForm>
        </PageContainer>
    );
};
