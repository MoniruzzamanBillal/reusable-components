import { roomData } from "@/components/main/tablePage/DummyRoomData";
import { TRoom } from "@/components/main/tablePage/TablePage";
import { NextRequest, NextResponse } from "next/server";

const mockRoomData: TRoom[] = roomData;

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const building = searchParams.get("building") || "";
  const floor = searchParams.get("floor") || "";
  const createdBy = searchParams.get("createdBy") || "";
  const status = searchParams.get("status") || "";

  // Apply filters
  let filteredData = [...mockRoomData];

  // Search filter (searches in building, buildingCode, RoomNo, createdBy)
  if (search) {
    filteredData = filteredData.filter(
      (room) =>
        room.building.toLowerCase().includes(search.toLowerCase()) ||
        room.buildingCode.toLowerCase().includes(search.toLowerCase()) ||
        room.RoomNo.toLowerCase().includes(search.toLowerCase()) ||
        room.createdBy.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Building filter
  if (building) {
    const buildingNames = building.split(",");
    filteredData = filteredData.filter((room) =>
      buildingNames.includes(room.building),
    );
  }

  // Floor filter
  if (floor) {
    const floorNumbers = floor.split(",");
    filteredData = filteredData.filter((room) =>
      floorNumbers.includes(room.floor),
    );
  }

  // Created By filter
  if (createdBy) {
    const creators = createdBy.split(",");
    filteredData = filteredData.filter((room) =>
      creators.includes(room.createdBy),
    );
  }

  // Status filter
  if (status) {
    const statuses = status.split(",");
    filteredData = filteredData.filter((room) =>
      statuses.includes(room.status),
    );
  }

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Prepare response
  const response = {
    data: paginatedData,
    statusCode: 200,
    success: true,
    message: "Rooms fetched successfully",
    meta: {
      currentPage,
      itemCount: paginatedData.length,
      limit,
      totalItems,
      totalPage: totalPages,
    },
  };

  // Simulate network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(response);
}
