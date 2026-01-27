"use client";

import GenericTable from "@/components/common/GenericTable";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { dummyData, TDummyUser } from "./dummyData/DummyData";
import CreateUpdateForm from "./form/CreateUpdateForm";

export default function ControlledInputImplement() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleEdit = (row) => {
    setSelectedData(row);
    setIsModalOpen(true);
  };

  // Table columns
  const columns: ColumnDef<TDummyUser>[] = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Image
            src={row.original.avatar || "https://i.pravatar.cc/150"}
            alt={row.original.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      ),
    },
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
        <div className="text-sm text-gray-600">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "department",
      header: "Department",
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
      accessorKey: "salary",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Salary
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-900">
          ${row.original.salary.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "projects",
      header: "Projects",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.projects.map((project, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700"
            >
              {project}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(row)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Edit size={14} />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => handleDelete(row.original.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Employee Management System
          </h1>
          <p className="text-gray-600 mt-2">
            A demo page showcasing all controlled form components with a data
            table
          </p>
        </div>

        {/* Main Content */}
        <div className="">
          {/* Table Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Employee Directory
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={() => setUsers(dummyData)}
                  >
                    Reset Data
                  </Button>
                </div>
              </div>

              <GenericTable
                data={dummyData}
                columns={columns}
                filterKey="name"
                isLoading={false}
              />
            </div>

            <CreateUpdateForm
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedData(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
