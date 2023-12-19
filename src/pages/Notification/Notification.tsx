import React, { useState, useEffect } from 'react';
import {Card, Button, Modal, Form, Input, List, message, Select} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    getCourseNotifications,
    deleteCourseNotification,
    insertCourseNotification,
    getAllTAs, getAllTeachers, getAllStudents
} from '@/services/ant-design-pro/api';
import {useParams} from "react-router-dom";
import {useAccess} from "umi"; // Update the import path as necessary


const CourseNotifications: React.FC = () => {
    const access = useAccess();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { courseId } = useParams<{ courseId: string }>();
    const courseIdBigInt = BigInt(courseId);
    const [TAs, setTAs] = useState([]); // Update the type as necessary
    const [teachers, setTeachers] = useState([]); // Update the type as necessary
    const [students, setStudents] = useState([]);

    const fetchNotifications = async () => {
        try {
            const response = await getCourseNotifications(courseIdBigInt);
            if (response) {
                setNotifications(response);
            }
        } catch (error) {
            message.error('获取通知失败');
        }
    };
    const fetchData = async () => {
        try {
            const tasData = await getAllTAs();
            const teachersData = await getAllTeachers();
            const studentsData = await getAllStudents();
            setTAs(tasData);
            setTeachers(teachersData);
            setStudents(studentsData);
        } catch (error) {
            message.error('获取数据失败');
        }
    };
    // 获取通知列表
    useEffect(() => {
        fetchNotifications();
        if(access.canTA){
            fetchData();
        }
    }, []);


    const handleAddNotification = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    // Assuming 'courseId' and 'receivers' are available in the context
                    const notificationData = {
                        courseId: courseId, // Replace with actual courseId
                        title: values.title,
                        message: values.message,
                        receivers: values.receivers||[], // Replace with actual receivers array or leave it out if not needed
                    };
                    await insertCourseNotification(notificationData);
                    message.success('通知发布成功');
                    fetchNotifications(); // Refresh the list
                } catch (error) {
                    console.error('Error during notification creation:', error);
                    message.error(`发布失败: ${error.message || '未知错误'}`);
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
            await deleteCourseNotification(id);
            message.success('通知已删除');
            setNotifications(notifications.filter(notification => notification.id !== id));
        } catch (error) {
            message.error('删除失败');
        }
    };

    return (
        <Card title="课程通知">
            {access.canTA && (
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                >
                    发布通知
                </Button>
            )}
            <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={item => (
                    <List.Item
                        actions={[
                            (access.canTA) && (
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDeleteNotification(item.id)}
                                >
                                    删除
                                </Button>
                            ),
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
                    <Form.Item
                        name="receivers"
                        label="接收者"
                        rules={[{ required: false }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="选择接收者"
                            allowClear
                        >
                            {TAs.map(ta => (
                                <Select.Option key={ta.id} value={ta.id}>
                                    {ta.username} (TA)
                                </Select.Option>
                            ))}
                            {teachers.map(teacher => (
                                <Select.Option key={teacher.id} value={teacher.id}>
                                    {teacher.username} (Teacher)
                                </Select.Option>
                            ))}
                            {students.map(student => (
                                <Select.Option key={student.id} value={student.id}>
                                    {student.username} (Student)
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default CourseNotifications;
