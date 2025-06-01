'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function syncUserInDb() {
  const auth = await currentUser();
  if (!auth?.id) return;
  const user = await prisma.user.findFirst({
    where: { externalId: auth.id },
  });

  if (!user) {
    return await prisma.user.create({
      data: {
        externalId: auth?.id,
        imageUrl: auth.imageUrl!,
        email: auth.emailAddresses[0].emailAddress!,
      },
    });
  }

  return user;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchCurrentUser(): Promise<any> {
  try {
    const auth = await currentUser();

    if (!auth?.id) {
      throw new Error('User is not authenticated.');
    }

    const user = await prisma.user.findUnique({
      where: { externalId: auth.id },
    });

    if (!user) {
      throw new Error('User not found in the database.');
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
