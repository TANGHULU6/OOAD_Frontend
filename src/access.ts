/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canTeacher: currentUser && currentUser.access === 'teacher',
    canTA: currentUser && currentUser.access === 'ta',
  };
}
