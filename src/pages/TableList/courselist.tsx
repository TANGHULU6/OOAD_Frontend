import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';

import {
    getCourseList,
    addCourse,
    updateCourse,
    removeCourse
} from '@/services/ant-design-pro/api';

const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);

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
            dataIndex: 'courseName',
            key: 'courseName',
        },
        {
            title: '任课教师ID',
            dataIndex: 'teacherId',
            key: 'teacherId',
            render: (text: number | null) => text === null ? '—' : text.toString(), // Explicitly declare type of text
        },
        {
            title: '是否已删除',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text: boolean | null) => text === null ? '—' : text.toString(), // Explicitly declare type of text
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: string | null) => text || '—', // Explicitly declare type of text
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
            render: (text: string | null) => text || '—', // Explicitly declare type of text
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
