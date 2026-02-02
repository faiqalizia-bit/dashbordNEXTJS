import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MdOutlineModeEditOutline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import NoDataRow from "./NoDataRow";


import type { TableProps as TablePropsType } from '@/types';

function StaticTable<T extends object = Record<string, unknown>>({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  showActions = true,
}: TablePropsType<T>) {
  return (
    <div className="bg-white rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.label}</TableHead>
            ))}
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <NoDataRow />
          ) : (
            data.map((row) => (
              <TableRow key={String((row as unknown as Record<string, unknown>)._id)}>
                {columns.map((col) => {
                  const value = (row as unknown as Record<string, unknown>)[col.key as string];
                  const v = value as unknown as T[keyof T];
                  return (
                    <TableCell key={String(col.key)}>
                      {col.render
                        ? col.render(v, row as T)
                        : (value as React.ReactNode)}
                    </TableCell>
                  );
                })}

                {showActions && (
                  <TableCell className="space-x-2">
                    <button
                      onClick={() => onEdit?.(row as T)}
                      className="px-3 py-1 text-black"
                    >
                      <MdOutlineModeEditOutline size={18} />
                    </button>

                    <button
                      onClick={() => onDelete?.(String((row as unknown as Record<string, unknown>)._id))}
                      className="px-3 py-1 text-black"
                    >
                      <AiTwotoneDelete size={18} />
                    </button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default StaticTable;
