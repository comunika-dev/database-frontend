import { constants } from '@/utils/constants-base';
import { DataTable } from '../../components/campany/campany';
import { columnsInvestor } from '../../components/campany/columns-investors';
import { Form, Button, Modal, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import {InputField} from '@/components/input';
import { role } from '@/utils/role';
import { MainContext } from '@/context/main.context';
import {PlusOutlined} from '@ant-design/icons'


function MyQrCodes() {
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
    const {name, investment_area, description, address, phone1, phone2, province,user_name, state, email} = values;
    fetch(`${constants.baseURL}/investor`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name, investment_area, description, address, phone1, phone2, province,user_name, state, email
      })
    }).then(async(response) =>{
      const data = await response.json();
      console.log(data);
      await getInvestors();
    }).catch(err=>{
      console.log("Erro encontrado ao adicionar nova empresa", err)
    })
  }

  const getInvestors = async() => {
    fetch(`${constants.baseURL}/investors`,{
      method:"GET",
    }).then(async(response )=> {
      const data:any = await response.json();
      if(data?.investors){
        setData(data.investors)
        // console.log("Datsa: ",data)
      }
    }).catch(err => {console.log(err)})
  }

  useEffect(()=>{
    getInvestors();
  },[])
  

  return (
    <div className='mt-8'>
    <div className='flex flex-row justify-between items-center pb-4 border-b'>
      <h1 className='text-2xl font-semibold text-gray-500'>Investidores</h1>
      {user === role.INVESTIDOR && 
      <Button onClick={showModal} className="h-[42px] rounded-md" icon={<PlusOutlined/>}>Adicionar startup</Button>
      }
    </div>
    <div>
      <DataTable columns={columnsInvestor} data={data}/>
    </div>
    <Modal
    open={open}
    onCancel={handleCancel}
    footer={[
      <button className='border border-[#F4AC35] text-[#F4AC35] font-medium rounded-md h-[42px] px-8' onClick={()=>{
        form.validateFields().then((values)=>{
          // form.resetFields();
          handleSubmit(values);
        }).catch((info)=>{
          console.log('Validate failed: ', info);
        })
      }}>Adicionar</button>
    ]}
    width={"60%"}>
      <Form
      form={form}
      layout='vertical'
      name='useForm'
      className='w-full'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Nome do investidor' name='name' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Nome do investidor'/>
        <InputField.InputText label='E-mail' name='email' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='E-mail'/>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Contacto' name='phone1' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto'/>
        <InputField.InputText label='Contacto alternativo' name='phone2' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto alternativo'/>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <InputField.InputText label='Provincia' name='province' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Provincia'/>
        <InputField.InputText label='Distrito' name='state' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Distrito'/>
        </div>
        <InputField.InputText  label='Endereço' name='address' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Rua, Avenida...' type='textarea'/>

        <InputField.TextArea  rows={4} label='Área de investimento' name='investment_area' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Área de investimento' type='textarea'/>
        <InputField.TextArea  rows={4} label='Descrição' name='description' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Descrição do investidor'/>
      </Form>
    </Modal>
  </div>
  )
}

export default MyQrCodes