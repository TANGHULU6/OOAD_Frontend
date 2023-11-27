import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';

import {
    getCourseList, // 获取课程列表
    addCourse,
    updateCourse,
    removeCourse
} from '@/services/ant-design-pro/api';

const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]); // 存储课程列表

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getCourseList();
            setCourses(response);
        };

        fetchCourses();
    }, []);

    const columns = [
        {
            title: '课程名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '任课教师',
            dataIndex: 'teacherName',
            key: 'teacherName',
        },
        {
            title: '教师助理',
            dataIndex: 'taName',
            key: 'taName',
        },
        {
            title: '学生人数',
            dataIndex: 'studentCount',
            key: 'studentCount',
        },
        {
            title: '创建时间',
            dataIndex: 'creationTime',
            key: 'creationTime',
        },
        // 可以添加更多列
    ];

    return (
        <Card title="课程列表">
            <Table dataSource={courses} columns={columns} rowKey="id" />
        </Card>
    );
};

export default CourseOverview;
