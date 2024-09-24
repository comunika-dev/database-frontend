import {ColumnDef} from '@tanstack/react-table'

export type Participant = {
  id:string
  name:string
  investment_interests:string
  investment_amout:string
  adddress:string
  contact:string
  investiment_strategy:string
  investiment_type:string
}

// function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('pt-BR', {
//     day: 'numeric',
//     month: 'long',
//   }).format(date);
// }


export const columnsInvestor:ColumnDef<Participant>[] = [
  {
    accessorKey:'name',
    header:'Nome do investidor'
  },
  {
    accessorKey:'investment_area',
    header:'Área de investimento'
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
    accessorKey:'email',
    header:'E-mail'
  },
  {
    accessorKey:'phone1',
    header:'Contacto'
  },
  
  // {
  //   accessorKey:'createdAt',
  //   header:'Data da Inscrição',
  //   cell: ({ row }) => formatDate(row.original.createdAt),
  // },


]