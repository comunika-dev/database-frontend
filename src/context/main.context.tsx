import React,{useEffect, useState} from "react";
import {message,notification} from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useSearchParams } from "react-router-dom";
import { RoleChecker } from "@/utils/role";


export const MainContext =  React.createContext({});

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const MainContextProvider  = ({children}:{children:React.ReactNode}) =>{
  const [api, contextHolder] = notification.useNotification();
  const [users, setUser] = useState<any>({});

  const [useSearch, setUseSearch] = useSearchParams();

  const firstname = useSearch.get('username');
  const lastname = useSearch.get('lastname');
  const datainfo = useSearch.get('datainfo');

  const UserLogged = () => {
    if(firstname !== null || lastname !== null || datainfo !== null){
       const userData:any = {firstname,lastname,datainfo};
       localStorage.setItem('user_logged',JSON.stringify(userData));
     }
   
     const storedUser = localStorage.getItem('user_logged');
  
     if (storedUser) {
      const user = JSON.parse(storedUser);
      // console.log(user) //aqui retorna valores correntos
      setUser(user);
     }
      
    }
  
    useEffect(()=>{
      UserLogged();
    },[])

  
  const user = RoleChecker(users?.datainfo);
  // console.log(user) //está retornando um número aqui

  const openNotificationWithIcon = (
    type: NotificationType = 'info',
    message: React.ReactNode,
    description: React.ReactNode,
    placement: NotificationPlacement = 'bottomRight',
) => {
    api[type]({
        message,
        description,
        placement,
        showProgress:true,
        pauseOnHover:false,
    });
};

  return(
    <MainContext.Provider value={{openNotificationWithIcon, user}}>
      {contextHolder}
      {children}
    </MainContext.Provider>
  )
}