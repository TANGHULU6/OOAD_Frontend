import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spin, message } from 'antd';

// 重命名接口以避免冲突
interface INotificationDetail {
    id: number;
    title: string;
    message: string;
    senderName: string;
    sendTime: string;
}

const NotificationDetail: React.FC = () => {
    const [notification, setNotification] = useState<INotificationDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { notificationId } = useParams<{ notificationId: string }>();

    // 假设的 API 路径
    const notificationDetailApi = `/api/notification/${notificationId}`;

    // 获取通知详细信息
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
        </Card>
    );
};

export default NotificationDetail;
