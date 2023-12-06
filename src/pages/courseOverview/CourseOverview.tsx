import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal, Form, Select, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// const { Option } = Select;

import { getCourseDetail } from '@/services/ant-design-pro/api';
import CourseDetail = API.CourseDetail;

const CourseOverview: React.FC = () => {
    const [course, setCourse] = useState<CourseDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                const jsonResponse = await getCourseDetail(Number(id));
                
                setCourse({
                    courseName: jsonResponse.courseName,
                    teacherName: jsonResponse.teacherName,
                    taNameList: jsonResponse.taNameList.filter(ta => ta !== null),
                    studentNum: jsonResponse.studentNum,
                    createTime: jsonResponse.createTime
                });
            } catch (error) {
                console.error('Error fetching course details:', error);
                message.error('获取课程信息失败');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleOk = () => {
        // Implement the logic to handle form submission
    };

    return (
        <Spin spinning={isLoading}>
            <Card title={course?.courseName || '课程详情'}>
                <p>教师: {course?.teacherName}</p>
                <p>教师助理: {course?.taNameList.join(', ')}</p>
                <p>学生人数: {course?.studentNum}</p>
                <p>创建时间: {course?.createTime}</p>
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
        </Spin>
    );
};

export default CourseOverview;
