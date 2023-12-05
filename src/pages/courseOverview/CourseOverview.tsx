import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 引入 useParams
import { Card, Button, Modal, Form, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

import {
    getCourseDetail, // Function to get course details
} from '@/services/ant-design-pro/api';

// Course information type
interface Course {
    id: number;
    name: string;
    teacher: string;
    teachingAssistants: string[];
    students: string[]; // Assuming this is the correct structure
    creationTime: string;
}

const CourseOverview: React.FC = () => {
    const [course, setCourse] = useState<Course | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Fetch course details
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const jsonResponse = await getCourseDetail(1); // Directly await the result of getCourseDetail
                // Directly use jsonResponse as course data
                setCourse({
                    id: 1, // Assuming you have the course ID
                    name: jsonResponse.courseName,
                    teacher: jsonResponse.teacherName,
                    teachingAssistants: jsonResponse.taNameList.filter(ta => ta !== null),
                    students: [], // Placeholder, replace with actual data if available
                    creationTime: jsonResponse.createTime,
                });
            } catch (error) {
                console.error('Error fetching course details:', error);
                message.error('获取课程信息失败');
            }
        };
        fetchCourse();
    }, []);

    const handleOk = () => {
        // Implement the logic to handle form submission
    };

    return (
        <Card title={course?.name}>
            <p>教师: {course?.teacher}</p>
            <p>教师助理: {course?.teachingAssistants.join(', ')}</p>
            <p>学生人数: {course?.students.length}</p>
            <p>创建时间: {course?.creationTime}</p>
            <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                管理教师助理和学生
            </Button>
            <Modal
                title="管理教师助理和学生"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                {/* Form content goes here */}
            </Modal>
        </Card>
    );
};

export default CourseOverview;
