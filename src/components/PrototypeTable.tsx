import { useMemo } from "react";
import { MetallicMaterialsData, NonMetallicMaterialsData } from "../constants";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";

function PrototypeTable() {
  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        header: "材料/工艺/后处理",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "materials",
            header: "",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
            minSize: 500,
          },
          {
            accessorKey: "type",
            header: "",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "手工",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "handmade",
            header: "纯手工",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "tools",
            header: "工具",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "增材制造",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "fdm",
            header: "FDM",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "sla",
            header: "SLA",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "mjf",
            header: "MJF",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "polyjet",
            header: "POLYJET",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "slm",
            header: "SLM",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "dlp_lcd",
            header: "DLP/LCD",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "sls",
            header: "SLS",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "more",
            header: "......",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "减材制造",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "cnc",
            header: "CNC",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "iron",
            header: "铁",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "lathe",
            header: "车",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "laser",
            header: "激光切割",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "another-more",
            header: "......",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "等材制造",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "injection_molding",
            header: "注塑",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "silicone_coating",
            header: "硅胶覆膜",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "sheet_metal",
            header: "钣金",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data: [...MetallicMaterialsData, ...NonMetallicMaterialsData],
    columns,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <div className="block overflow-x-scroll overflow-y-hidden">
      <div className="h-2" />
      <table
        {...{
          style: {
            // width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ position: "relative", width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${
                          header.column.getIsResizing() ? "isResizing" : ""
                        }`}
                      ></div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className="hover:scale-120"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PrototypeTable;
