import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

import { listCourses } from '@/services/ant-design-pro/api';

const CourseOverview: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const history = useHistory(); // Use the useHistory hook for navigation

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

    const onRowClick = (record) => {
        return {
            onClick: () => {
                history.push(`/Notification/${record.id}`); // Navigate to CourseNotifications with courseId
            },
        };
    };

    return (
        <Card title="课程通知列表">
            <Table
                dataSource={courses}
                columns={columns}
                rowKey="id"
                onRow={onRowClick} // Add the onRow property
            />
        </Card>
    );
};

export default CourseOverview;
