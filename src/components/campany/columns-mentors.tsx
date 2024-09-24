import {ColumnDef} from '@tanstack/react-table'

export type Participant = {
  id:string
  name:string
  especialization:string
  available:string
  contact:string
  address:string
  mentor_story:string
}

// function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('pt-BR', {
//     day: 'numeric',
//     month: 'long',
//   }).format(date);
// }


export const columnsMentors:ColumnDef<Participant>[] = [
  {
    accessorKey:'name',
    header:'Nome do investidor'
  },
  {
    accessorKey:'description',
    header:'Descrição'
  },
  {
    accessorKey:'province',
    header:'Provincia',
  },
  {
    accessorKey:'district',
    header:'Distrito'
  },
  {
    accessorKey:'address',
    header:'Endereço'
  },
  {
    accessorKey:'email',
    header:'Email'
  },
  {
    accessorKey:'phone1',
    header:'Número de telefone'
  },

  
  // {
  //   accessorKey:'createdAt',
  //   header:'Data da Inscrição',
  //   cell: ({ row }) => formatDate(row.original.createdAt),
  // },


]