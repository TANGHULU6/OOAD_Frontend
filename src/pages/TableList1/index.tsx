import React, { useState, useRef } from 'react';
import { Button, message, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';

import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import type { TableListItem, TableListPagination } from './data';

const handleAdd = async (fields: TableListItem) => {
    const hide = message.loading('Adding...');
    try {
        await addRule({ ...fields });
        hide();
        message.success('Added successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Failed to add, please try again!');
        return false;
    }
};

const handleUpdate = async (fields: Partial<TableListItem>, currentRow?: TableListItem) => {
    const hide = message.loading('Updating...');
    try {
        await updateRule({
            ...currentRow,
            ...fields,
        });
        hide();
        message.success('Updated successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Failed to update, please try again!');
        return false;
    }
};

const handleRemove = async (selectedRows: TableListItem[]) => {
    const hide = message.loading('Deleting...');
    if (!selectedRows) return true;
    try {
        await removeRule({
            key: selectedRows.map((row) => row.key),
        });
        hide();
        message.success('Deleted successfully');
        return true;
    } catch (error) {
        hide();
        message.error('Failed to delete, please try again!');
        return false;
    }
};

const CourseList: React.FC = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<TableListItem>();
    const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (dom, entity) => {
                return <a onClick={() => { setCurrentRow(entity); setShowDetail(true); }}>{dom}</a>;
            },
        },
        // Add more columns as needed
        {
            title: 'Action',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a key="config" onClick={() => { handleUpdateModalVisible(true); setCurrentRow(record); }}>Edit</a>,
                <a key="delete" onClick={async () => { await handleRemove([record]); actionRef.current?.reload(); }}>Delete</a>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<TableListItem, TableListPagination>
                headerTitle="Course List"
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { handleModalVisible(true); }}>
                        <PlusOutlined /> New Course
                    </Button>,
                ]}
                request={rule}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
            />

            <ModalForm
                title="New Course"
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value as TableListItem);
                    if (success) {
                        handleModalVisible(false);
                        actionRef.current?.reload();
                    }
                }}
            >
                <ProFormText name="name" label="Course Name" rules={[{ required: true, message: 'Course name is required' }]} />
                <ProFormTextArea name="desc" label="Description" />
            </ModalForm>

            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value, currentRow);
                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);
                        actionRef.current?.reload();
                    }
                }}
                onCancel={() => { handleUpdateModalVisible(false); setCurrentRow(undefined); }}
                updateModalVisible={updateModalVisible}
                values={currentRow || {}}
            />

            <Drawer
                width={600}
                visible={showDetail}
                onClose={() => { setCurrentRow(undefined); setShowDetail(false); }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<TableListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({ data: currentRow || {} })}
                        params={{ id: currentRow?.name }}
                        columns={columns as ProDescriptionsItemProps<TableListItem>[]}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default CourseList;
