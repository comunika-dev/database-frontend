import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InputField } from "../input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter,
      sorting:sort
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getSortedRowModel:getSortedRowModel(),
    onGlobalFilterChange: setFilter,
    onSortingChange:setSort,
    

  });
  

  const handleSortChange = (value:string)=>{
    if(value === "asc"){
      setSort([{id:"name",desc:false}]); //classifica de A-Z
    }else if(value === "desc"){
      setSort([{id:"name", desc:true}]); //classifica de Z-A
    }
  }
  return (
    <div>
      <div className="flex flex-row justify-between items-center my-4 mt-8 gap-8">
        <div className="w-full">
          <InputField.Input
            placeholder="Procurar por nome, data, descrição..."
            required={false}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end w-full">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[150px] h-10 rounded-md border-gray-200 hover:border-[#F4AC35] focus:ring-[#F4AC35] focus:border-[#F4AC35] flex flex-row gap-1">
              <ListFilter strokeWidth={1}/>
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">A-Z</SelectItem>
              <SelectItem value="desc">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className=" bg-[#f1f7f9] font-semibold letter-wide"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="font-medium text-[15px]"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-row justify-between py-[16px] gap-2 items-center">
        <div>
          <span className="font-medium text-lg">{`Mostrando ${
            table.getState().pagination.pageSize
          } dos ${table.getRowCount()} itens`}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div>
            <span className="font-medium text-lg">{`Página ${
              table.getState().pagination.pageIndex + 1
            } de ${table.getPageCount()}`}</span>
          </div>
          <div className="flex flex-row justify-end gap-2">
            <Button
              variant="outline"
              className={`border p-2 rounded-sm ${
                !table.getCanPreviousPage()
                  ? "border-gray-300 text-gray-300"
                  : "border-gray-500 text-gray-500"
              }`}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft strokeWidth={1} />
            </Button>

            <Button
              variant="outline"
              className={`border p-2 rounded-sm ${
                !table.getCanPreviousPage()
                  ? "border-gray-300 text-gray-300"
                  : "border-gray-500 text-gray-500"
              }`}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft strokeWidth={1} />
            </Button>

            <Button
              variant="outline"
              className={`border p-2 rounded-sm ${
                !table.getCanNextPage()
                  ? "border-gray-300 text-gray-300"
                  : "border-gray-500 text-gray-500"
              }`}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight strokeWidth={1} />
            </Button>

            <Button
              variant="outline"
              className={`border p-2 rounded-sm ${
                !table.getCanNextPage()
                  ? "border-gray-300 text-gray-300"
                  : "border-gray-500 text-gray-500"
              }`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight strokeWidth={1} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
