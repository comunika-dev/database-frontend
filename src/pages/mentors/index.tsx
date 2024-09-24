import { constants } from '@/utils/constants-base';
import { DataTable } from '../../components/campany/campany';
import { columnsMentors } from '../../components/campany/columns-mentors';
import { Form, Button, Modal } from 'antd'
import { useContext, useEffect, useState } from 'react'
import {InputField} from '@/components/input';
import { MainContext } from '@/context/main.context';
import {PlusOutlined} from '@ant-design/icons'
import { role } from '@/utils/role';

function Billing() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>([]);
  const {user,openNotificationWithIcon}:any = useContext(MainContext);

  const [form] = Form.useForm();

  const showModal = () =>{
    setOpen(true);
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values:any) =>{
    const {name, phone1,phone2,address, description,email, province, district, user_name} = values;
    fetch(`${constants.baseURL}/mentor`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name, phone1,phone2,address, description,email, province, district, user_name
      })
    }).then(async(response) =>{
      const data = await response.json();
      if(data.mentor){
        console.log(data);
        await getMentor();
        
      }else{
        openNotificationWithIcon('error','Erro encontrado, tente verificar se os dados cumpreem com o recomendado!');
      }
    }).catch(err=>{
      console.log("Erro encontrado ao adicionar nova empresa", err)
    })
  }

  const getMentor = async() => {
    fetch(`${constants.baseURL}/mentors`,{
      method:"GET",
    }).then(async(response )=> {
      const data:any = await response.json();
      if(data?.mentors){
        setData(data.mentors)
        // console.log("Datsa: ",data)
      }
    }).catch(err => {console.log(err)})
  }

  useEffect(()=>{
    getMentor();
  },[])
  
    
  
    return (
      <div className='mt-8'>
      <div className='flex flex-row justify-between items-center pb-4 border-b'>
        <h1 className='text-2xl font-semibold text-gray-500'>Mentores</h1>
        {(user === role.ADMIN || user === role.GESTOR) && 
      <Button onClick={showModal} className="h-[42px] rounded-md" icon={<PlusOutlined/>}>Adicionar Mentor</Button>
      }
      </div>
      <div>
        <DataTable columns={columnsMentors} data={data}/>
      </div>
      <Modal
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button className="h-[42px] rounded-md" icon={<PlusOutlined/>} onClick={()=>{
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
          <InputField.InputText label='Nome do mentor' name='name' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Nome do mentor'/>
          <InputField.InputText label='Email' name='email' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='email' type='email'/>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField.InputText label='Contacto' name='phone1' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto'/>
          <InputField.InputText  label='Contacto alternativo' name='phone2' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Contacto alternativo' type='textarea'/>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputField.InputText label='Província' name='province' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Provincia'/>
          <InputField.InputText  label='Distrito' name='district' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Distrito'/>
          </div>
          <InputField.InputText  label='Endereço' name='address' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Distrito'/>
          
  
          {/* <InputField.TextArea  rows={4} label='História de sucesso' name='story' required={true} message='O preenchimento deste campo é de carácter obrigatório' placeholder='História de sucesso' type='textarea'/> */}
          <InputField.TextArea  rows={4} label='Descrição' name='description' required={false} message='O preenchimento deste campo é de carácter obrigatório' placeholder='Descrição'/>
        </Form>
      </Modal>
    </div>
  )
}

export default Billing