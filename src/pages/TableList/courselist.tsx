import React, { useState, useEffect } from 'react';
import { Card, List, Button, Modal, Form, Select, message } from 'antd';
import { useParams } from 'react-router-dom';

// 假设的 API 方法
import {
    getCourseDetail, // 获取课程详情
    appointTA, // 任命教师助理
    dismissTA, // 免职教师助理
    addStudent, // 添加学生
    removeStudent, // 移除学生
    getAllTeachers, // 获取所有教师
    getAllStudents // 获取所有学生
} from '@/services/ant-design-pro/api';

const CourseOverview: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [course, setCourse] = useState<any>(null);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchCourseDetail = async () => {
            const courseDetail = await getCourseDetail(courseId);
            setCourse(courseDetail);
        };

        fetchCourseDetail();
    }, [courseId]);

    useEffect(() => {
        // 获取所有教师和学生列表，用于下拉选择
        const fetchAllTeachersAndStudents = async () => {
            const teacherList = await getAllTeachers();
            const studentList = await getAllStudents();
            setTeachers(teacherList);
            setStudents(studentList);
        };

        fetchAllTeachersAndStudents();
    }, []);

    const handleOk = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            // 根据表单内容调用 API，如任命助教或添加学生
            await appointTA(courseId, values.taId);
            message.success('操作成功');
            setIsModalVisible(false);
        } catch (error) {
            message.error('操作失败');
        }
    };

    return (
        <Card title={course?.name}>
            <List>
                <List.Item>任课教师: {course?.teacherName}</List.Item>
                <List.Item>教师助理: {course?.taName}</List.Item>
                <List.Item>学生人数: {course?.studentCount}</List.Item>
                <List.Item>创建时间: {course?.creationTime}</List.Item>
            </List>
            <Button onClick={() => setIsModalVisible(true)}>管理课程</Button>
            <Modal
                title="管理课程"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="taId" label="选择教师助理">
                        <Select options={teachers.map(teacher => ({ value: teacher.id, label: teacher.name }))} />
                    </Form.Item>
                    <Form.Item name="studentId" label="添加学生">
                        <Select options={students.map(student => ({ value: student.id, label: student.name }))} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default CourseOverview;
