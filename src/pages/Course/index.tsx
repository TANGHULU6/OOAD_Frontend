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
                // Other ProTable configurations
                request={async (params = {}, sort, filter) => {
                    // Implement the logic to fetch course data
                    const courseList = await listCourses();
                    return {
                        data: courseList
                    }
                }}
                editable={{
                    type: 'single',
                    onSave: async (key, record, originRow, newLineConfig) => {
                        try {
                            const result = await updateCourse(record);
                            if (result && result === true) {
                                message.success("保存成功！");
                                actionRef.current?.reload();
                                return Promise.resolve();
                            } else {
                                throw new Error();
                            }
                        } catch (error) {
                            message.error('保存失败，请重试！');
                            return Promise.reject();
                        }
                    },
                    onDelete: async (key, row) => {
                        try {
                            const result = await deleteCourse(row.id);
                            if (result && result === true) {
                                message.success("删除成功！");
                                actionRef.current?.reload();
                                return Promise.resolve();
                            } else {
                                throw new Error();
                            }
                        } catch (error) {
                            message.error('删除失败，请重试！');
                            return Promise.reject();
                        }
                    }
                }}
                // ... other configurations
            />

            <ModalForm
                title="添加课程"
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    console.log(value)
                    try {
                        const result = await insertCourse(value as API.CourseList);
                        if (result) {
                            message.success("添加成功！");
                            actionRef.current?.reload();
                            return true;
                        } else {
                            throw new Error();
                        }
                    } catch (error) {
                        message.error('添加失败，请重试！');
                        return true;
                    }
                }}
            >
                // Define form fields for course creation
            </ModalForm>
        </PageContainer>
    );
};
