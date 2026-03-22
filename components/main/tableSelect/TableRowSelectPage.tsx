"use client";

import BaseModal from "@/components/Modal/BaseModal";
import ModalActionButtons from "@/components/Modal/ModalActionButtons";
import PageHeader from "@/components/PageHeader/PageHeader";
import GenericTableComponent from "@/components/table/GenericTableComponent";
import TableActionMenu from "@/components/table/TableActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { roomData } from "../tablePage/DummyRoomData";
import { TRoom } from "../tablePage/TablePage";

const tableFilterOption = [
  {
    key: "nameOfBuilding",
    label: "Building Name",
    options: [
      { label: "Administration Building", value: "Administration Building" },
      { label: "Production Facility A", value: "Production Facility A" },
      { label: "Warehouse Complex", value: "Warehouse Complex" },
      {
        label: "Research & Development Center",
        value: "Research & Development Center",
      },
      { label: "Quality Control Lab", value: "Quality Control Lab" },
      {
        label: "Employee Welfare Building",
        value: "Employee Welfare Building",
      },
      { label: "Maintenance Workshop", value: "Maintenance Workshop" },
      { label: "Cold Storage Facility", value: "Cold Storage Facility" },
    ],
  },
  {
    key: "numberOfFloor",
    label: "Floor Number",
    options: [
      { label: "Floor 1", value: "1" },
      { label: "Floor 2", value: "2" },
      { label: "Floor 3", value: "3" },
      { label: "Floor 4", value: "4" },
    ],
  },
  {
    key: "createdBy",
    label: "Created By",
    options: [
      { label: "John Doe", value: "John Doe" },
      { label: "Sarah Ahmed", value: "Sarah Ahmed" },
      { label: "Michael Brown", value: "Michael Brown" },
      { label: "Emily Watson", value: "Emily Watson" },
      { label: "Robert Chen", value: "Robert Chen" },
      { label: "Fatima Begum", value: "Fatima Begum" },
      { label: "David Kumar", value: "David Kumar" },
      { label: "James Wilson", value: "James Wilson" },
    ],
  },
];

export default function TableRowSelectPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [selectedRoomData, setSelectedRoomData] = useState<TRoom | undefined>();

  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const [selectedRows, setSelectedRows] = useState<TRoom[]>([]);

  const handleEditMenuClick = (room: TRoom) => {
    setSelectedRoomData(room);
    setIsModalOpen(true);
  };

  const handleDeleteItem = () => {
    console.log("delete room id =", deleteItemId);
  };

  const roomColumns = useMemo<ColumnDef<TRoom>[]>(
    () => [
      {
        accessorKey: "building",
        header: "Name of Building",
        enableSorting: true,
      },
      {
        accessorKey: "buildingCode",
        header: "Building Code",
        enableSorting: true,
      },
      {
        accessorKey: "floor",
        header: "Number of Floor",
        enableSorting: false,
      },
      {
        accessorKey: "RoomNo",
        header: "Number of Room",
        enableSorting: false,
      },

      {
        accessorKey: "addedDate",
        header: "Added Date",
        enableSorting: false,
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        enableSorting: false,
      },
      {
        id: "actions",
        header: "Action",
        enableSorting: false,
        cell: ({ row }) => {
          const room = row.original;
          return (
            <TableActionMenu
              rowData={room}
              onDelete={(data: TRoom) => {
                setIsDeleteModalOpen(true);
                setDeleteItemId(data.id);
              }}
              onEdit={(data: TRoom) => handleEditMenuClick(data)}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="  bg-gray-200 min-h-screen  px-20 py-10  ">
      <div className="mb-6">
        <PageHeader
          btnText="Add"
          headerTitle={"Table page"}
          onClick={() => setIsModalOpen(true)}
          pageName="Table with row select"
        />
      </div>

      <GenericTableComponent
        data={roomData}
        columns={roomColumns}
        tableFilterOption={tableFilterOption}
        filters={filters}
        setFilters={setFilters}
        showSerialNumber={false}
        enableRowSelection={true}
        onSelectedRowsChange={setSelectedRows}
      />

      <BaseModal
        className="  max-w-[400px] "
        open={isDeleteModalOpen}
        showDeleteIcon={true}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteItemId(null);
        }}
      >
        <div className="mt-5">
          <h1 className="text-[1.125rem] font-semibold text-white">
            Delete Room
          </h1>

          <p className="text-[0.875rem] text-neutral-50 mt-2">
            Are you sure you want to delete this room?
            <span className="font-semibold">
              {" "}
              This action cannot be undone.
            </span>
          </p>
        </div>

        <ModalActionButtons
          cancelText="Cancel"
          confirmText="Delete"
          onConfirm={() => handleDeleteItem()}
        />
      </BaseModal>
    </div>
  );
}
