import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';

import {
    listCourses,
    // addCourse,
    // updateCourse,
    // removeCourse
} from '@/services/ant-design-pro/api';

const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await listCourses();
            setCourses(response);
        };

        fetchCourses();
    }, []);

    const columns = [
        {
            title: '课程ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '课程名称',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        // Add more columns as needed
    ];

    return (
        <Card title="课程列表">
            <Table dataSource={courses} columns={columns} rowKey="id" />
        </Card>
    );
};

export default CourseOverview;
