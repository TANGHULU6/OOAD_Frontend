import React, {useEffect, useState} from 'react';
import {Button, Card, Form, message, Modal, Select, Spin} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

// const { Option } = Select;
import {addStudent, appointTA, dismissTA, getAllStudents, getAllTAs, getCourseDetail, removeStudent} from '@/services/ant-design-pro/api';
import {useAccess} from 'umi';

interface CourseOverviewProps {
    id: number; // 定义传入的 id 属性
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ id }) => {
    let [course, setCourse] = useState<API.CourseDetail>();
    const [TAs, setTAs] = useState<API.TAList[]>([]);
    const [students, setStudents] = useState<API.StudentList[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    // const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchCourse = async () => {
            setIsLoading(true);
            try {
                console.log(id)
                const jsonData = await getCourseDetail(id);

                // @ts-ignore
                setCourse({
                    courseName: jsonData.courseName,
                    teacherName: jsonData.teacherName,
                    taNameList: jsonData.taNameList,
                    studentNum: jsonData.studentNum,
                    createTime: jsonData.createTime
                });
            } catch (error) {
                console.error('Error fetching course details:', error);
                message.error('获取课程信息失败');
            } finally {
                setIsLoading(false);
            }

        };
        fetchCourse();

        // 获取所有TA
        const fetchTAs = async () => {
            setIsLoading(true);
            try {
                const jsonData = await getAllTAs();
                // @ts-ignore
                setTAs(jsonData);
            } catch (error) {
                console.error('Error fetching course details:', error);
                message.error('获取教师助理列表失败');
            } finally {
                setIsLoading(false);
            }
        };

        // 获取所有学生
        const fetchStudents = async () => {
            setIsLoading(true);
            try {
                const jsonData = await getAllStudents();
                // @ts-ignore
                setStudents(jsonData);
            } catch (error) {
                console.error('Error fetching course details:', error);
                message.error('获取学生列表失败');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTAs();
        fetchStudents();
    }, [id]);


    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (values.taId) {
                await appointTA(id, [values.taId]);
                message.success('任命教师助理成功');
            }
            if (values.dismissTaId) {
                await dismissTA(id, [values.dismissTaId]);
                message.success('免职教师助理成功');
            }
            if (values.studentId) {
                await addStudent(id, [values.studentId]);
                message.success('添加学生成功');
            }
            if (values.removeStudentId) {
                await removeStudent(id, [values.removeStudentId]);
                message.success('移除学生成功');
            }
            setIsModalVisible(false);
        } catch (error) {
            message.error('操作失败');
        }
    };


    const access = useAccess();
    return (
        <Spin spinning={isLoading}>
            <Card title={course?.courseName || '课程详情'}>
                <p>教师: {course?.teacherName}</p>
                <p>教师助理: {course?.taNameList?.join(', ')}</p>
                <p>学生人数: {course?.studentNum}</p>
                <p>创建时间: {course?.createTime}</p>
                {access.canAdmin && (
                    <Button icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                        管理教师助理和学生
                    </Button>
                )}
                <Modal
                    title="管理教师助理和学生"
                    visible={isModalVisible}
                    onOk={handleSubmit}
                    onCancel={() => setIsModalVisible(false)}
                >
                    {/* Form content goes here */}
                    <Form form={form} layout="vertical">
                        <Form.Item name="taId" label="任命教师助理">
                            <Select
                                placeholder="选择教师助理"
                                allowClear
                            >
                                {TAs.map(ta => (
                                    <Select.Option key={ta.id} value={ta.id}>
                                        {ta.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="dismissTaId" label="免职教师助理">
                            <Select
                                placeholder="选择教师助理"
                                allowClear
                            >
                                {TAs.map(ta => (
                                    <Select.Option key={ta.id} value={ta.id}>
                                        {ta.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="studentId" label="添加学生">
                            <Select
                                placeholder="选择学生"
                                allowClear
                            >
                                {students.map(student => (
                                    <Select.Option key={student.id} value={student.id}>
                                        {student.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="removeStudentId" label="移除学生">
                            <Select
                                placeholder="选择学生"
                                allowClear
                            >
                                {students.map(student => (
                                    <Select.Option key={student.id} value={student.id}>
                                        {student.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </Spin>
    );
};

export default CourseOverview;
