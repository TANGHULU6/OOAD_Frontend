import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, message } from 'antd';

// Updated interface to include new fields
interface INotificationDetail {
    id: number;
    title: string;
    message: string;
    senderName: string;
    sendTime: string;
    courseName?: string;     // Optional fields for courseName and projectName
    projectName?: string;
    isRead: boolean;         // isRead field
}

const NotificationDetail: React.FC = () => {
    const [notification, setNotification] = useState<INotificationDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { notificationId } = useParams<{ notificationId: string }>();

    const notificationDetailApi = `/api/notification/${notificationId}`;

    useEffect(() => {
        const fetchNotificationDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(notificationDetailApi);
                const data = await response.json();
                setNotification(data);
            } catch (error) {
                message.error('获取通知详情失败');
            } finally {
                setLoading(false);
            }
        };

        fetchNotificationDetail();
    }, [notificationId]);

    if (loading) {
        return <Spin tip="加载中..."/>
    }

    return (
        <Card title="通知详情">
            <h3>{notification?.title}</h3>
            <p>{notification?.message}</p>
            <p>发送者: {notification?.senderName}</p>
            <p>发送时间: {notification?.sendTime}</p>
            {notification?.courseName && <p>课程名称: {notification?.courseName}</p>}
            {notification?.projectName && <p>项目名称: {notification?.projectName}</p>}
            <p>已读状态: {notification?.isRead ? '已读' : '未读'}</p>
        </Card>
    );
};

export default NotificationDetail;
