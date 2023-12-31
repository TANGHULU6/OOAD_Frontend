import { DefaultFooter } from '@ant-design/pro-layout';
const Footer: React.FC = () => {
  const defaultMessage = 'SUSTech OOAD项目组出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
    />
  );
};
export default Footer;
