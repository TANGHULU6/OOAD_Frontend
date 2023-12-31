// src/pages/CourseDetails.jsx
import {Layout, Menu} from 'antd';
import {useParams} from 'umi';
import CourseOverview from "@/pages/Course/Detail/CourseOverview";

const CourseDetails = () => {
  // @ts-ignore
  const { courseId } = useParams();
  const { Sider } = Layout;

  return (
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          // defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {/* 项目和作业菜单项 */}
          <Menu.Item key="1">项目A</Menu.Item>
          <Menu.Item key="2">作业X</Menu.Item>
          {/* 更多项目和作业 */}
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '20px' }}>
        <CourseOverview id={courseId} />
      </Layout>
    </Layout>
  );
};

export default CourseDetails;
