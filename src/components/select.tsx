import { Form, Select as SelectField } from "antd";
import React, { useState } from "react";

interface OptionsProps {
  value:string
  label:string
}

type selectProps = {
  placeholder?:string
  options:OptionsProps[]
  name:string,
  label:string
  required?:boolean
};

function Select({label,name,placeholder,options, required}:selectProps) {
  return (
    <Form.Item
      label={label}
      name={name}
      className="w-full"
      required={required}
    >
      <SelectField
        style={{ borderRadius: 2, borderRightColor: "#f4ac35",height:40 }}
        placeholder={placeholder}
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
      />
    </Form.Item>
  );
}


export {Select}