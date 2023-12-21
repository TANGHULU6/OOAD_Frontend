import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import {
    getGroupDetails,
    updateGroupDetails,
    joinGroup,
    leaveGroup
} from '@/services/ant-design-pro/api';
import { useAccess } from 'umi'; // Update import path as necessary

const Group = () => {
    const [group, setGroup] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const access = useAccess();
    const { groupId } = useParams(); // Assuming groupId is passed in URL

    useEffect(() => {
        fetchGroupDetails();
    }, []);

    const fetchGroupDetails = async () => {
        try {
            const response = await getGroupDetails(groupId);
            setGroup(response);
            form.setFieldsValue(response); // Prepopulate form with group details
        } catch (error) {
            message.error('获取小组详情失败');
        }
    };

    const handleUpdate = async (values) => {
        try {
            await updateGroupDetails({ groupId, ...values });
            message.success('小组信息更新成功');
            setIsEditing(false);
            fetchGroupDetails();
        } catch (error) {
            message.error('更新失败');
        }
    };

    const handleJoinGroup = async () => {
        try {
            const response = await joinGroup(groupId);
            if (response) {
                message.success('成功加入小组');
                fetchGroupDetails();
            }
        } catch (error) {
            message.error('加入小组失败');
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await leaveGroup(groupId);
            if (response) {
                message.success('已退出小组');
                fetchGroupDetails();
            }
        } catch (error) {
            message.error('退出小组失败');
        }
    };

    return (
        <Card title="小组详情">
            {!isEditing ? (
                <div>
                    <p>小组名称: {group?.groupName}</p>
                    <p>组长: {group?.groupLeader}</p>
                    <p>答辩老师: {group?.defenceTeacher}</p>
                    <p>展示时间: {group?.presentationTime}</p>
                    <p>对外信息: {group?.publicInfo}</p>
                    {(access.canTeacher || access.canTA || access.canAdmin) && (
                        <Button onClick={() => setIsEditing(true)}>编辑小组信息</Button>
                    )}
                    <Button onClick={handleJoinGroup}>加入小组</Button>
                    <Button onClick={handleLeaveGroup}>退出小组</Button>
                </div>
            ) : (
                <Form form={form} onFinish={handleUpdate} layout="vertical">
                    <Form.Item name="groupName" label="小组名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="groupLeader" label="组长">
                        <Input />
                    </Form.Item>
                    <Form.Item name="defenceTeacher" label="答辩老师">
                        <Input />
                    </Form.Item>
                    <Form.Item name="presentationTime" label="展示时间">
                        <Input />
                    </Form.Item>
                    <Form.Item name="publicInfo" label="对外信息">
                        <Input.TextArea />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        更新信息
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>取消</Button>
                </Form>
            )}
        </Card>
    );
};

export default Group;
