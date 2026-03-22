"use client";

import BaseModal from "@/components/Modal/BaseModal";
import ModalActionButtons from "@/components/Modal/ModalActionButtons";
import PageHeader from "@/components/PageHeader/PageHeader";
import TableActionMenu from "@/components/table/TableActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export type TRoom = {
  id: string;
  addedDate: string;
  createdBy: string;
  buildingCode: string;
  building: string;
  floor: string;
  RoomNo: string;
  status: string;
  roomZone: string;
};

export default function TablePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [selectedRoomData, setSelectedRoomData] = useState<TRoom | undefined>();

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

  //
  return (
    <div className="  bg-gray-200 h-screen  px-20 py-10  ">
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="mb-6">
        <PageHeader
          btnText="Add"
          headerTitle={"Table page"}
          onClick={() => setIsModalOpen(true)}
          pageName="Table"
        />
      </div>
      {/*  */}
      {/*  */}
      {/*  */}

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

      {/*  */}
    </div>
  );
}
