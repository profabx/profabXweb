import { useEffect, useMemo, useReducer, useState } from "react";
import { mockData } from "../constants";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import type {
  Column,
  Table,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  ColumnDef,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  // if (rowA.columnFiltersMeta[columnId]) {
  //   dir = compareItems(
  //     rowA.columnFiltersMeta[columnId]?.itemRank!,
  //     rowB.columnFiltersMeta[columnId]?.itemRank!
  //   );
  // }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function PrototypeTable() {
  const rerender = useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // const columns = useMemo<ColumnDef<any, any>[]>(
  //   () => [
  //     {
  //       header: "材料/工艺/后处理",
  //       footer: (props) => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: "firstName",
  //           cell: (info) => info.getValue(),
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           accessorFn: (row) => row.lastName,
  //           id: "lastName",
  //           cell: (info) => info.getValue(),
  //           header: () => <span>Last Name</span>,
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  //           id: "fullName",
  //           header: "Full Name",
  //           cell: (info) => info.getValue(),
  //           footer: (props) => props.column.id,
  //           filterFn: "fuzzy",
  //           sortingFn: fuzzySort,
  //         },
  //       ],
  //     },
  //     {
  //       header: "手工",
  //       footer: (props) => props.column.id,
  //       columns: [
  //         {
  //           accessorKey: "age",
  //           header: () => "Age",
  //           footer: (props) => props.column.id,
  //         },
  //         {
  //           header: "More Info",
  //           columns: [
  //             {
  //               accessorKey: "visits",
  //               header: () => <span>Visits</span>,
  //               footer: (props) => props.column.id,
  //             },
  //             {
  //               accessorKey: "status",
  //               header: "Status",
  //               footer: (props) => props.column.id,
  //             },
  //             {
  //               accessorKey: "progress",
  //               header: "Profile Progress",
  //               footer: (props) => props.column.id,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        header: "材料/工艺/后处理",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "metal materials",
            header: "金属材料",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
            minSize: 500,
          },
          {
            id: "iron steel",
            header: "铁/钢",
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
            id: "handmade",
            header: "纯手工",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "tools",
            header: "工具",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "增材制造",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "fdm",
            header: "FDM",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "sla",
            header: "SLA",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "mjf",
            header: "MJF",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "polyjet",
            header: "POLYJET",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "slm",
            header: "SLM",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "dlp/lcd",
            header: "DLP/LCD",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "sls",
            header: "SLS",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
          {
            id: "more",
            header: "......",
            cell: (info) => "",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "减材制造",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "cnc",
            header: "CNC",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "iron",
            header: "铁",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "lathe",
            header: "车",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "laser",
            header: "激光切割",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "more",
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
            id: "injection molding",
            header: "注塑",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "silicone coating",
            header: "硅胶覆膜",
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
          },
          {
            id: "sheet metal",
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
    data: mockData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="p-2">
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
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
                    <td key={cell.id}>
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

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default PrototypeTable;
