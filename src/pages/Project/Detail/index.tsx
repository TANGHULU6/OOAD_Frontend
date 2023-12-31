import React, {useState} from 'react';
import {Layout, Menu, MenuProps} from 'antd';
import {useParams} from 'umi';
import {BookTwoTone, HddTwoTone} from "@ant-design/icons";
import ProjectOverview from "@/pages/Project/Detail/ProjectOverview";

const ProjectDetails = () => {
  // @ts-ignore
  const {projectId} = useParams();
  const {Sider} = Layout;
  const [selectedMenuItem, setSelectMenuItem] = useState('projectDetail');

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
    getItem('项目详情', 'projectDetail', <BookTwoTone/>),
    getItem('小组列表', 'groupList', <HddTwoTone/>),
    getItem('返回上一级', 'return', <HddTwoTone/>),
  ];

  return (
      <Layout>
        <Sider width={200} style={{background: '#fff'}}>
          <Menu
              onClick={onClick}
              defaultSelectedKeys={['projectDetail']}
              mode="inline"
              items={items}
          />
        </Sider>
        <Layout style={{paddingLeft: '30px'}}>
          {selectedMenuItem === 'projectDetail' && <ProjectOverview projectId={projectId}/>}
        </Layout>
      </Layout>
  );
};

export default ProjectDetails;
