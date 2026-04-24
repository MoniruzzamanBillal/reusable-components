import TableActionMenu from "@/components/shared/table/TableActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import { TRoom } from "../TablePage";

export default function GetTablePageColumn(
  onEdit?: (room: TRoom) => void,
  onDelete?: (room: TRoom) => void,
): ColumnDef<TRoom>[] {
  return [
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
            onEdit={() => onEdit?.(room)}
            onDelete={() => onDelete?.(room)}
          />
        );
      },
    },
  ];
}
