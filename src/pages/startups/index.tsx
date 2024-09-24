import { constants } from '@/utils/constants-base';
import { DataTable } from '../../components/campany/campany';
import { columnsStartup } from '../../components/campany/columns-startup';
import { Form, Button, Modal, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import {InputField} from '@/components/input';
import { Select } from '@/components/select';
import { PlusIcon } from 'lucide-react';
import {PlusOutlined} from '@ant-design/icons'
import { MainContext } from '@/context/main.context';
import { role } from '@/utils/role';

function MyAccount() {
  const {openNotificationWithIcon}:any = useContext(MainContext)
    const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const {user}:any = useContext(MainContext);

  const [form] = Form.useForm();

  const showModal = () =>{
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values:any) =>{
    const {name,product, business_idea,description, address, business_name, province, state,phone2,email,phone1,business_year,category} = values;
    fetch(`${constants.baseURL}/start-up`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name,product, business_idea,description, address, business_name, province, state,phone2,email,phone1,business_year,category
      })
    }).then(async(response) =>{
      const data = await response.json();
      console.log(data);
      await getStartup();
    }).catch(err=>{
      console.log("Erro encontrado ao adicionar nova empresa", err)
    })
  }

  const getStartup = async() => {
    fetch(`${constants.baseURL}/start-ups`,{
      method:"GET",
    }).then(async(response )=> {
      const data:any = await response.json();
      if(data?.startups){
        setData(data.startups)
        // console.log("Datsa: ",data)
      }else if(data?.message){
        openNotificationWithIcon("error", "","Verifica se os campos cumpreem todos requisitos necessários")
      }
    }).catch(err => {console.log(err)})
  }

  useEffect(()=>{
    getStartup();
  },[])
  

  return (
    <div className='mt-8'>
    <div className='flex flex-row justify-between items-center pb-4 border-b'>
      <h1 className='text-2xl font-semibold text-gray-500'>Empreendedores</h1>
      {(user === role.ADMIN || user === role.GESTOR) && 
      <Button onClick={showModal} className="h-[42px] rounded-md" icon={<PlusOutlined/>}>Adicionar empreendedor</Button>
      }
    </div>
    <div>
      <DataTable columns={columnsStartup} data={data}/>
    </div>
    <Modal
    open={open}
    onCancel={handleCancel}
    footer={[
      <Button icon={<PlusOutlined/>} className='h-[42px] rounded-md' onClick={()=>{
        form.validateFields().then((values)=>{
          // form.resetFields();
          handleSubmit(values);
        }).catch((info)=>{
          console.log('Validate failed: ', info);
        })
      }}>Adicionar</Button>
    ]}
    width={"60%"}>
      <Form
      form={form}
      layout='vertical'
      name='useForm'
      className='w-full'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Nome' name='name' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Nome do startup'/>
        <InputField.InputText label='Nome do empreendedor' name='business_name' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Número de telefone'/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Contacto' name='phone1' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Número de telefone'/>
        <InputField.InputText label='Contacto alternativo' name='phone2' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Número de telefone alternativo'/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Provincia' name='province' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Provincia'/>
        <InputField.InputText label='Distrito' name='state' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Distrito'/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='E-mail' name='email' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='E-mail'/>
        <Select label='Categoria' name='category' placeholder='Selecione' options={[{value:"Não incubado",label:"Não incubado"},{value:"Incubado",label:"Incubado"}]}/>
        </div>
        

        
        <InputField.InputText  label='Endereço' name='address' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Localização da empresa' type='textarea'/>
        <InputField.InputText  label='Produto e ou serviço' name='product' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Produto e ou serviço' type='textarea'/>
        <InputField.InputText  label='Ano do negócio' name='business_year' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='' type='date'/>

        <InputField.TextArea  rows={4} label='Ideia de Negócio' name='business_idea' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='' type='textarea'/>
        <InputField.TextArea  rows={4} label='Descrição' name='description' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder=''/>
      </Form>
    </Modal>
  </div>
  )
}

export default MyAccount