import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  // Get the reservationID that is going to be cancelled and check it exists
  const { reservationId } = params;
  if (!reservationId || typeof reservationId != "string") {
    throw new Error("Invalid Id");
  }

  // Delete the reservation
  // Check to make sure that either the user that made the reservation is deleting it
  // OR
  // The user that has created the listing is deleting it
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
