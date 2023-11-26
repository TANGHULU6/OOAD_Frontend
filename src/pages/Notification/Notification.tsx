import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, List, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

// 假设的通知类型
interface Notification {
    id: number;
    title: string;
    message: string;
}

const CourseNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // 假设的 API 路径
    const notificationsApi = '/api/course/notification/list';

    // 获取通知列表
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // 替换为您的 API 调用
                const response = await fetch(notificationsApi);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                message.error('获取通知失败');
            }
        };
        fetchNotifications();
    }, []);

    const handleAddNotification = () => {
        form
            .validateFields()
            .then(values => {
                // 这里应该是一个 API 请求来添加通知
                // 假设 addNotification() 是一个添加通知的函数
                const addNotification = async () => {
                    try {
                        // 替换为您的 API 调用
                        await fetch(notificationsApi, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });
                        message.success('通知发布成功');
                    } catch (error) {
                        message.error('发布失败');
                    }
                };
                addNotification();
                setIsModalVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleDeleteNotification = (id: number) => {
        // 这里应该是一个 API 请求来删除通知
        // 假设 deleteNotification() 是一个删除通知的函数
        const deleteNotification = async () => {
            try {
                // 替换为您的 API 调用
                await fetch(`${notificationsApi}/${id}`, {
                    method: 'DELETE',
                });
                message.success('通知已删除');
            } catch (error) {
                message.error('删除失败');
            }
        };
        deleteNotification();
    };

    return (
        <Card title="课程通知">
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
            >
                发布通知
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteNotification(item.id)}
                            >
                                删除
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={item.message}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title="发布新通知"
                visible={isModalVisible}
                onOk={handleAddNotification}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="标题"
                        rules={[{ required: true, message: '请输入标题!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="message"
                        label="内容"
                        rules={[{ required: true, message: '请输入通知内容!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default CourseNotifications;
