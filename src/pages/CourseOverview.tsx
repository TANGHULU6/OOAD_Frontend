import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Select, message } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Option } = Select;

// 假设的课程信息类型
interface Course {
  id: number;
  name: string;
  teacher: string;
  teachingAssistants: string[];
  students: string[];
  creationTime: string;
}

// 假设的用户类型
interface User {
  id: number;
  name: string;
}

const CourseOverview: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);

  // 假设的 API 路径
  const courseApi = '/api/course';
  const teacherApi = '/api/user/listAllTeacherName';
  const studentApi = '/api/user/listAllStudentName';

  // 获取课程信息
  useEffect(() => {
    // 这里应该是一个 API 请求来获取课程信息
    // 假设 fetchCourse() 是一个获取课程信息的函数
    const fetchCourse = async () => {
      try {
        // 替换为您的 API 调用
        const response = await fetch(courseApi);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        message.error('获取课程信息失败');
      }
    };
    fetchCourse();
  }, []);

  // 获取教师列表
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // 替换为您的 API 调用
        const response = await fetch(teacherApi);
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        message.error('获取教师列表失败');
      }
    };
    fetchTeachers();
  }, []);

  // 获取学生列表
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // 替换为您的 API 调用
        const response = await fetch(studentApi);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        message.error('获取学生列表失败');
      }
    };
    fetchStudents();
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // 这里应该是一个 API 请求来更新课程信息
        // 假设 updateCourse() 是一个更新课程信息的函数
        const updateCourse = async () => {
          try {
            // 替换为您的 API 调用
            await fetch(courseApi, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            message.success('更新成功');
          } catch (error) {
            message.error('更新失败');
          }
        };
        updateCourse();
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
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
        <Form form={form} layout="vertical">
          <Form.Item
            name="teachingAssistants"
            label="教师助理"
          >
            <Select
              mode="multiple"
              placeholder="选择教师助理"
              optionLabelProp="label"
            >
              {teachers.map(teacher => (
                <Option value={teacher.id} label={teacher.name}>
                  {teacher.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="students"
            label="学生"
          >
            <Select
              mode="multiple"
              placeholder="选择学生"
              optionLabelProp="label"
            >
              {students.map(student => (
                <Option value={student.id} label={student.name}>
                  {student.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CourseOverview;
