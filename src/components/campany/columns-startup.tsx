import {ColumnDef} from '@tanstack/react-table'

export type Participant = {
  name:string, 
  status:string,
  product:string,
  business_idea:string, 
  business_desc:string, 
  address:string,
  picture:string,
  business_plan:string
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
  }).format(date);
}


export const columnsStartup:ColumnDef<Participant>[] = [
  {
    accessorKey:'name',
    header:'Nome do investidor'
  },
  {
    accessorKey:'business_name',
    header:'Nome do negócio'
  },
  {
    accessorKey:'description',
    header:'Descrição'
  },
  {
    accessorKey:'province',
    header:'Provincia'
  },
  {
    accessorKey:'state',
    header:'Distrito'
  },
  {
    accessorKey:'address',
    header:'Endereço'
  },
  {
    accessorKey:'product',
    header:'Produto e ou serviço'
  },
  {
    accessorKey:'business_year',
    header:'Ano do negócio',
    cell:({row})=> formatDate(row.getValue('business_year'))
  },
  {
    accessorKey:'business_idea',
    header:'Ideia de negócio'
  },
  {
    accessorKey:'category',
    header:'Estado'
  },
  
  // {
  //   accessorKey:'createdAt',
  //   header:'Data da Inscrição',
  //   cell: ({ row }) => formatDate(row.original.createdAt),
  // },


]