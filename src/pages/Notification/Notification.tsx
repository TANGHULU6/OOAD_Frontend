import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Input, List, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCourseNotifications, deleteCourseNotification } from '@/services/ant-design-pro/api'; // Update the import path as necessary

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

    // 获取通知列表
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Update with the correct parameters if needed
                const data = await getCourseNotifications();
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
            .then(async (values) => {
                try {
                    await addNotification(values); // Adjust the parameters as needed
                    message.success('通知发布成功');
                } catch (error) {
                    message.error('发布失败');
                }
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleDeleteNotification = async (id: number) => {
        try {
            await deleteNotification(id); // Adjust the parameters as needed
            message.success('通知已删除');
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            message.error('删除失败');
        }
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
