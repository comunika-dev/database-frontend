import React from "react";
import { Form, Input as Inputs } from "antd";

type FormProps = {
  
  children:React.ReactNode
}

type InputProps = {
  placeholder?:string
  type?:string
  rows?:number,
  maxLength?:number
  label?:string
  name?:string
  required?:boolean
  message?:string
  value?:any
  onChange?:(e:React.ChangeEvent<HTMLInputElement>)=> void
}



function InputField({children}:FormProps) {
  return (
    <>
      {children}
    </>
  );
}
function InputText ({value,onChange,label, rows,maxLength,name,message,required,placeholder,type}:InputProps){
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message,
        },
      ]}
    >
     <Inputs
        className="h-10 rounded-md border-[#F4AC35]  w-full"
        placeholder={placeholder} type={type}
      />
    </Form.Item>
    
  )
}

function TextArea({label, rows,name,message,required,placeholder,maxLength}:InputProps){
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: message,
        },
      ]}
    >
    <Inputs.TextArea
    className="h-10 rounded-md border-[#F4AC35] focus:ring-[#F4AC35] focus:border-[#F4AC35] w-full"
    placeholder={placeholder}
    maxLength={maxLength}
    rows={rows}
  />
    </Form.Item>
   
  )
}

function Input ({value, onChange, placeholder}:InputProps) {
  return(
    <Inputs value={value} onChange={onChange} placeholder={placeholder} className="h-10 rounded-md border-[#F4AC35] focus:ring-[#F4AC35] focus:border-[#F4AC35] w-full"/>
  )
}

InputField.InputText = InputText;
InputField.TextArea = TextArea;
InputField.Input = Input;

export {InputField};
