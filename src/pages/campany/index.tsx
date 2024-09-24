import { constants } from '@/utils/constants-base';
import { DataTable } from '../../components/campany/campany';
import { columns } from '../../components/campany/columns';
import { Form, Button, Modal, Input, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import {InputField} from '@/components/input';
import { MainContext } from '@/context/main.context';
import { role } from '@/utils/role';
import {PlusOutlined} from '@ant-design/icons'

function Campany() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const {openNotificationWithIcon}:any = useContext(MainContext);
  const {user}:any = useContext(MainContext);

  const [form] = Form.useForm();

  const showModal = () =>{
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values:any) =>{
    const {name, description, sector, phone1,phone2, province, district, product_and_or_service, website, address, year_of_creation, user_name,acceleration} = values;
    fetch(`${constants.baseURL}/enteprise`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name, description, sector, phone1,phone2, province, district, product_and_or_service, website, address, year_of_creation, user_name,acceleration
      })
    }).then(async(response) =>{
      const data = await response.json();
      console.log(data);
      if(data.enteprise){
        getEnteprise();
      }else if(data.erro){
        openNotificationWithIcon('error','Erro encontrado, tente verificar se os dados cumpreem com o recomendado!')
      }
    }).catch(err=>{
      console.log("Erro encontrado ao adicionar nova empresa", err)
    })
  }

  const getEnteprise = async() => {
    fetch(`${constants.baseURL}/enteprises`,{
      method:"GET",
    }).then(async(response )=> {
      const data:any = await response.json();
      if(data?.enteprises){
        setData(data.enteprises)
        console.log("Data: ",data)
      }
    }).catch(err => {console.log(err)})
  }

  useEffect(()=>{
    getEnteprise();
  },[])
  
  console.log(data)

  

  return (
    <div className='mt-8'>
      <div className='flex flex-row justify-between items-center pb-4 border-b'>
        <h1 className='text-2xl font-semibold text-gray-500'>Empresas</h1>
        {(user === role.ADMIN || user === role.GESTOR) && 
      <Button onClick={showModal} className="h-[42px] rounded-md" icon={<PlusOutlined/>}>Adicionar empresa</Button>
      }
      </div>
      <div>
        <DataTable columns={columns} data={data}/>
      </div>
      <Modal
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button className="h-[42px] rounded-md" icon={<PlusOutlined/>} onClick={()=>{
          form.validateFields().then((values)=>{
            form.resetFields();
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
          <InputField.InputText label='Nome da empresa' name='name' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Nome da empresa'/>
          <InputField.InputText label='Ano de criação' name='year_of_creation' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='' type='date'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField.InputText label='Contacto' name='phone1' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto'/>
          <InputField.InputText label='Contacto alternativo' name='phone2' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto alternativo'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField.InputText label='Provincia' name='province' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Provincia'/>
          <InputField.InputText label='Distrito' name='district' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Distrito'/>
          </div>
          <InputField.InputText label='Endereço' name='address' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Rua, Avenida'/>
          <InputField.InputText label='Website' name='website' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Website da empresa caso tenha'/>

          <Form.Item
          label="Empresa acelerada?"
          name="acceleration" className='w-full'>
          <Select
          style={{borderRadius:2, borderRightColor:'#f4ac35'}}
    // className='h-10 rounded-md border-[#F4AC35] focus:ring-[#F4AC35] focus:border-[#F4AC35] w-full'
    placeholder="Procura"
    optionFilterProp="label"
    
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'Acelerada',
        label: 'Acelerada',
      },
      {
        value: 'Não acelerada',
        label: 'Não acelerada',
      }
    ]}
  />
          </Form.Item>
          

          
          <InputField.InputText  label='Produto e ou Serviço' name='product_and_or_service' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Produto e ou serviço' type='textarea'/>
          <InputField.TextArea  rows={4} label='Descrição' name='description' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Descrição da empresa' type='textarea'/>
        </Form>
      </Modal>
    </div>
  )
}

export default Campany