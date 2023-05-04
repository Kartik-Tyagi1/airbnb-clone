import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

// ADD TO FAVORITEIDs
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  // Get the listingId that was favorited and check it exists
  const { listingId } = params;
  if (!listingId || typeof listingId != "string") {
    throw new Error("Invalid Id");
  }

  // Create new array the includes the new favorited listing
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Updated the favoriteIds array with the newly created array
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

// REMOVE FROM FAVORITEIDs
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  // Get the listingId that was unfavorited and check it exists
  const { listingId } = params;
  if (!listingId || typeof listingId != "string") {
    throw new Error("Invalid Id");
  }

  // Create new array the removes the listing that was unfavorited
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id != listingId);

  // Updated the favoriteIds array with the newly created array
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
