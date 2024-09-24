import {useState } from "react";
import { getItem } from "../utils/get-item";
import {Investors, Campany, StartUps, Mentors, SignIn, PageNotFount } from "../pages";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Layout, Menu } from "antd";
import theme from "../utils/theme";
import ptBr from "antd/locale/pt_BR";
import styles from './index.module.scss'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {QrcodeOutlined,UserOutlined,UsergroupAddOutlined,AccountBookOutlined} from '@ant-design/icons'
import logo from '../assets/Universidade-Zambeze-Logo.png'

const { Header, Sider, Content } = Layout;

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // console.log("Usuario: ",user)

  const menuItems = [
    // getItem("Home", "/home",<DashboardOutlined />, <Inicio />),
    getItem("Empresas", "/",<QrcodeOutlined />, <Campany />),
    getItem("Investidores", "/investors",<UserOutlined />, <Investors />),
    getItem("Mentor", "/mentors",<AccountBookOutlined />, <Mentors />),
    getItem("Empreendedores", "/entrepreneurs",<UsergroupAddOutlined />, <StartUps />),
  ];

  const handleMenuClick = ({ key }: any) => {
    if (key) {
      navigate(key);
    }
  };

  return (
    <ConfigProvider locale={ptBr} theme={theme}>
      <Layout className="min-h-screen">
        <Header className={`${styles.header} ${isCollapsed ? styles.folded : ''}`}>
          <h1 className="text-2xl font-bold">Banco de dados</h1>
          <div>
            <Button className="h-[40px] rounded-md" href="https://uz.comunika.co.mz">Voltar ao inicio</Button>
          </div>
        </Header>
        <Layout className="bg-[#fdfdfd]">
          <Sider className={`${styles.aside} ${isCollapsed ? styles.collapsed : ''}`} trigger={null} theme="light" collapsed={isCollapsed}>
          <div className="mb-4 pt-2 flex flex-col justify-center items-center">
            {(<img src={logo} alt="logo-incubadora" className={isCollapsed ? "w-12 h-12" : "w-16 h-16"} />)}
            
          </div>
            <Menu
              className={styles.menu}
              theme="light"
              mode="inline"
              items={menuItems}
              selectedKeys={[pathname]}
              onClick={handleMenuClick}
            />
            <div className={styles.btnCollapse} onClick={()=>setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ChevronRight/> : <ChevronLeft/>}
            </div>
          </Sider>
          <Routes>
            {menuItems.map(item => <Route key={`menu-${item?.key}`} path={item?.key?.toString()} element={<Content className={`${styles.contentLayout} ${isCollapsed ? styles.folded : ''}`}>{item?.element}</Content>}/>)}

            {menuItems.map(item => item?.children?.map((subItem:any) => <Route key={`menu-${subItem?.key}`} path={subItem?.key?.toString()} element={<Content className={`${styles.contentLayout} ${isCollapsed ? styles.folded : ''}`}>{subItem?.element}</Content>}/>))}
            <Route key="menu-root" path="/sign-in" element={<SignIn/>}/>
            <Route key="menu-all" path="*" element={<PageNotFount/>}/>
          </Routes>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
