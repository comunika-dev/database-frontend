import {ColumnDef} from '@tanstack/react-table'

export type Participant = {
  id:string
  name:string
  description:string
  phone2:string
  province:string
  district:string
  product_and_or_service:string
  website:string
  user_name:string
  acceleration:string
  email:string
  phoneNumber:string
  address:string
  year_of_creation:string
}

// function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   return new Intl.DateTimeFormat('pt-BR', {
//     day: 'numeric',
//     month: 'long',
//   }).format(date);
// }


export const columns:ColumnDef<Participant>[] = [
  {
    accessorKey:'name',
    header:'Nome da empresa'
  },
  {
    accessorKey:'description',
    header:'Descrição'
  },
  {
    accessorKey:'product_and_or_service',
    header:'Produto e ou Serviço'
  },
  {
    accessorKey:'province',
    header:'Provincia'
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
    accessorKey:'phone1',
    header:'Contacto'
  },
  {
    accessorKey:'website',
    header:'Website'
  },
  {
    accessorKey:'acceleration',
    header:'Aceleração'
  },
  {
    accessorKey:'year_of_creation',
    header:'Data da Inscrição',
    // cell: ({ row }) => formatDate(row.getValue('year_of_creation')),
  },


]