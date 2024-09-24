import { MenuProps } from "antd"

type MenuItem = Required<MenuProps>['items'][number];


export function getItem(
  label:React.ReactNode,
  key:React.Key,
  icon?:React.ReactNode,
  element?:JSX.Element | null,
  children?:MenuItem[],
  type?:'group'
):any {
  return {
    label,
    key,
    icon,
    element,
    children,
    type
  }
}


