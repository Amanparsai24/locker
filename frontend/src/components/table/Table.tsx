// components/table/Table.tsx
import Pagination from "./Pagination";
// import { Column, TableProps } from "./table.types";

export type Column<T> = {
  title: string;
  key: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pageSize: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

const Table = <T extends Record<string, any>>({
  columns = [],
  data = [],
  pageSize = 10,
  currentPage = 1,
  totalItems = 0,
  onPageChange,
}: TableProps<T>) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="bg-white rounded-lg shadow border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left font-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}

          {data.map((row, i) => (
            <tr key={i} className="border-t hover:bg-gray-50 transition">
              {columns.map((col, j) => (
                <td key={j} className="px-4 py-2">
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
