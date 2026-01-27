"use client";

import GenericTable from "@/components/common/GenericTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { dummyData, TDummyUser } from "./DummyData";

export default function TablePage() {
  //

  // Define table columns following the exact Shadcn pattern
  const columns: ColumnDef<TDummyUser>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role", // Regular header (no sorting button)
      cell: ({ row }) => (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department", // Regular header (no sorting button)
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">{row.original.department}</div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          Active: "bg-green-100 text-green-800",
          Inactive: "bg-gray-100 text-gray-800",
          Pending: "bg-yellow-100 text-yellow-800",
        };

        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${statusColors[status]}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Join Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login", // Regular header (no sorting button)
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">
          {new Date(row.original.lastLogin).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
          <br />
          <span className="text-xs">
            {new Date(row.original.lastLogin).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => alert(`Edit ${row.original.name}`)}
            className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`Delete ${row.original.name}`)}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  //
  return (
    <div className="   ">
      {/*  */}
      <div className="min-h-screen bg-slate-200 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Generic Table Demo
            </h1>
            <p className="text-gray-600 mt-2">
              A reusable table component with filtering, sorting, and pagination
            </p>
          </div>

          {/* Table Demo */}
          <div className="bg-white rounded-lg shadow p-6 border  ">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                User Management
              </h2>
              <p className="text-gray-600">
                This table demonstrates all features: filtering by name, sorting
                by clicking headers, pagination, and loading states.
              </p>
            </div>

            {/* The Generic Table Component */}
            <GenericTable
              data={dummyData}
              columns={columns}
              filterKey="name"
              isLoading={false}
            />
          </div>

          {/* Features Explanation */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-2">🔍 Filtering</h3>
              <p className="text-gray-600 text-sm">
                Type in the filter input above the table to filter by name. The
                filter is dynamic and works with pagination.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-2">📊 Sorting</h3>
              <p className="text-gray-600 text-sm">
                Click on any column header to sort by that column. Click again
                to toggle between ascending and descending.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                📄 Pagination
              </h3>
              <p className="text-gray-600 text-sm">
                Navigate through pages using the pagination controls. Shows
                smart page number display for large datasets.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
}
