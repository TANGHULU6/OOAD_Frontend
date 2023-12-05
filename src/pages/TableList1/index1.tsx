import React, { useState, useRef } from 'react';
import { Button, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { getCourseList, addOrUpdateCourse, removeCourse } from '@/services/ant-design-pro/api';

const CourseList = () => {
    const [modalVisible, handleModalVisible] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState(null);

    const handleAddOrUpdate = async (fields, isUpdate = false) => {
        const hide = message.loading(isUpdate ? 'Updating...' : 'Adding...');
        try {
            await addOrUpdateCourse({ ...fields });
            hide();
            message.success(isUpdate ? 'Updated successfully' : 'Added successfully');
            return true;
        } catch (error) {
            hide();
            message.error('Operation failed, please try again!');
            return false;
        }
    };

    const handleRemove = async (record) => {
        const hide = message.loading('Deleting...');
        try {
            await removeCourse({ id: record.id });
            hide();
            message.success('Deleted successfully');
            return true;
        } catch (error) {
            hide();
            message.error('Failed to delete, please try again!');
            return false;
        }
    };

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            render: (dom, entity) => <a onClick={() => { setCurrentRow(entity); setShowDetail(true); }}>{dom}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a key="config" onClick={() => { handleModalVisible(true); setCurrentRow(record); }}>Edit</a>,
                <a key="delete" onClick={() => handleRemove(record)}>Delete</a>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable
                headerTitle="Course List"
                actionRef={actionRef}
                rowKey="id"
                search={false}
                toolBarRender={() => [
                    <Button type="primary" onClick={() => handleModalVisible(true)}>
                        <PlusOutlined /> New Course
                    </Button>,
                ]}
                request={getCourseList}
                columns={columns}
            />

            <ModalForm
                title={currentRow ? "Edit Course" : "New Course"}
                visible={modalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAddOrUpdate(value, !!currentRow);
                    if (success) {
                        handleModalVisible(false);
                        setCurrentRow(null);
                        actionRef.current?.reload();
                    }
                }}
            >
                <ProFormText name="courseName" label="Course Name" initialValue={currentRow?.courseName} rules={[{ required: true, message: 'Course name is required' }]} />
                <ProFormDateTimePicker name="groupDeadline" label="Group Deadline" initialValue={currentRow?.groupDeadline} />
                <ProFormDateTimePicker name="endDeadline" label="End Deadline" initialValue={currentRow?.endDeadline} />
            </ModalForm>

            <Drawer
                width={600}
                visible={showDetail}
                onClose={() => { setCurrentRow(null); setShowDetail(false); }}
                closable={false}
            >
                {currentRow && (
                    <ProDescriptions
                        column={2}
                        title={currentRow.courseName}
                        request={async () => ({ data: currentRow })}
                        params={{ id: currentRow.id }}
                        columns={columns}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default CourseList;
