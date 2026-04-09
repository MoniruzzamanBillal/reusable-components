"use client";

import BaseModal from "@/components/Modal/BaseModal";
import ModalActionButtons from "@/components/Modal/ModalActionButtons";
import PageHeader from "@/components/PageHeader/PageHeader";
import GenericTableComponent from "@/components/table/GenericTableComponent";
import { useFetchData } from "@/hooks/useApi";
import { usePagination } from "@/hooks/usePagination";
import { useSearchDebounce } from "@/hooks/useSearchDebounce";
import { useEffect, useState } from "react";
import GetTablePageColumn from "./TablePageColumn/GetTablePageColumn";

type TRoomInformation = {
  roomFloor: string;
  RoomNo: string;
  roomStatus: string;
  roomZone: string;
};

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

  roomInformation: TRoomInformation[];
};

const tableFilterOption = [
  {
    key: "activeStatus",
    label: "Status",
    options: [
      { label: "Active", value: "1" },
      { label: "Inactive", value: "0" },
    ],
  },
];

export default function TablePage() {
  const { search, handleSearchChange, debouncedSearch } =
    useSearchDebounce(500);
  const {
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setTotalItems,
  } = usePagination();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [selectedRoomData, setSelectedRoomData] = useState<TRoom | undefined>();

  const [filters, setFilters] = useState<Record<string, string>>({});

  const params = new URLSearchParams({
    page: currentPage?.toString(),
    size: itemsPerPage?.toString() || "10",
  });

  if (debouncedSearch) {
    params.set("searchTerm", debouncedSearch);
  }

  const apiEndpoint = `/rooms?${params?.toString()}`;

  const { data, isLoading } = useFetchData<TRoom>(
    [
      "all-room",
      currentPage?.toString(),
      itemsPerPage?.toString(),
      debouncedSearch,
      // filters.activeStatus,
    ],
    apiEndpoint,
  );

  // console.log("data = ", data);

  // ! Update total items whenever data changes
  useEffect(() => {
    if (data) {
      setTotalItems(data?.meta?.totalItems || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleEditMenuClick = (room: TRoom) => {
    setSelectedRoomData(room);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (room: TRoom) => {
    console.log("delete room id =", deleteItemId);
    console.log("delere room = ", room);
  };

  const handleDeleteItem = () => {
    console.log("delete room id =", deleteItemId);
  };

  const roomColumns = GetTablePageColumn(
    handleEditMenuClick,
    handleDeleteClick,
  );

  const totalPages =
    data?.meta?.totalPage || Math.ceil(totalItems / itemsPerPage);

  const roomData = Array.isArray(data?.data) ? data?.data : [];

  //
  return (
    <div className="  bg-gray-200 min-h-screen  px-20 py-10  ">
      {/*  */}

      <div className="mb-6">
        <PageHeader
          btnText="Add"
          headerTitle={"Table page"}
          onClick={() => setIsModalOpen(true)}
          pageName="Table"
        />
      </div>

      <GenericTableComponent
        isLoading={isLoading}
        data={roomData || []}
        columns={roomColumns}
        tableFilterOption={tableFilterOption}
        filters={filters}
        setFilters={setFilters}
        // !
        onSearchChange={handleSearchChange}
        searchValue={search}
        // !
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
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

      {/*  */}
    </div>
  );
}
