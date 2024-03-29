import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import {Avatar, Divider, Menu, Spin} from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { logout } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';
import {ItemType} from "antd/es/menu/hooks/useItems";

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await logout();
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      history.push(`/account`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
  }

//   const menuHeaderDropdown = (
//     <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
//       {menu && (
//         <Menu.Item key="center">
//           <UserOutlined />
//           个人中心
//         </Menu.Item>
//       )}
//       {menu && (
//         <Menu.Item key="settings">
//           <SettingOutlined />
//           个人设置
//         </Menu.Item>
//       )}
//       {menu && <Menu.Divider />}
//
//       <Menu.Item key="logout">
//         <LogoutOutlined />
//         退出登录
//       </Menu.Item>
//     </Menu>
//   );
//   return (
//     <HeaderDropdown overlay={menuHeaderDropdown}>
//       <span className={`${styles.action} ${styles.account}`}>
//         <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
//         <span className={`${styles.name} anticon`}>{currentUser.name}</span>
//       </span>
//     </HeaderDropdown>
//   );
// };
  const menuItems: ItemType[] = [
    ...(menu
      ? [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]
      : [
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar src={currentUser.avatarUrl} style={{ fontSize: 18 }} size="default" className={styles.avatar}>
            {currentUser.username?.charAt(0)}
          </Avatar>
          <Divider type="vertical" />
          <span className={`${styles.name} anticon`}>{name}</span>
        </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
