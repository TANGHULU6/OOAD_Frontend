import React, {useState} from 'react';
import {Layout, Menu, MenuProps} from 'antd';
import {useParams} from 'umi';
import CourseOverview from "@/pages/Course/Detail/CourseOverview";
import {BookTwoTone, EditTwoTone, FundTwoTone, HddTwoTone} from "@ant-design/icons";
import ProjectList from "@/pages/Project/List";
import AssignmentList from "@/pages/Assignment/List";
import GradeBook from "@/pages/GradeBook";

const CourseDetails = () => {
  // @ts-ignore
  const {courseId} = useParams();
  const {Sider} = Layout;
  const [selectedMenuItem, setSelectMenuItem] = useState('courseDetail');

  type MenuItem = Required<MenuProps>['items'][number];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setSelectMenuItem(e.key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('课程详情', 'courseDetail', <BookTwoTone/>),
    getItem('项目列表', 'projectList', <HddTwoTone/>),
    getItem('作业列表', 'assignmentList', <EditTwoTone/>),
    getItem('成绩册', 'gradeBook', <FundTwoTone/>),

    // getItem('Navigation One', 'sub1', <MailOutlined/>, [
    //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    // ]),
    //
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined/>, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    // ]),
    //
    // {type: 'divider'},
    //
    // getItem('Navigation Three', 'sub4', <SettingOutlined/>, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
    //   getItem('Option 11', '11'),
    //   getItem('Option 12', '12'),
    // ]),
    //
    // getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];

  return (
    <Layout>
      <Sider width={200} style={{background: '#fff'}}>
        <Menu
          onClick={onClick}
          // style={{width: 256}}
          defaultSelectedKeys={['courseDetail']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{paddingLeft: '30px'}}>
        {selectedMenuItem === 'courseDetail' && <CourseOverview courseId={courseId}/>}
        {selectedMenuItem === 'projectList' && <ProjectList courseId={courseId}/>}
        {selectedMenuItem === 'assignmentList' && <AssignmentList courseId={courseId}/>}
        {selectedMenuItem === 'gradeBook' && <GradeBook courseId={courseId}/>}
      </Layout>
    </Layout>
  );
};

export default CourseDetails;
