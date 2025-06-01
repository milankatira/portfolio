'use server';

import prisma from '@/lib/prisma';
import { fetchCurrentUser } from './auth.action';

export async function addAuthorizedOrigin(origin: string) {
  try {
    const auth = await fetchCurrentUser();
    // Check if the origin already exists for the user
    const existingOrigin = await prisma.authorizedOrigin.findFirst({
      where: { origin, userId: auth.id },
    });
    if (existingOrigin) {
      throw new Error('DUPLICATE_ORIGIN');
    }

    // Add the new origin
    const newOrigin = await prisma.authorizedOrigin.create({
      data: { userId: auth.id, origin },
    });
    return newOrigin;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding origin:', error.message);

      // Customize error message for duplicate origin
      if (error.message === 'DUPLICATE_ORIGIN') {
        throw new Error('The origin already exists for this user.');
      }
    } else {
      console.error('Error adding origin:', error);
    }

    throw new Error('Failed to add origin.');
  }
}

export async function fetchAuthorizedOrigins() {
  try {
    const auth = await fetchCurrentUser();
    const origins = await prisma.authorizedOrigin.findMany({
      where: { userId: auth.id },
      orderBy: { createdAt: 'asc' },
    });
    return origins;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding origin:', error.message);
    } else {
      console.error('Error adding origin:', error);
    }
    throw new Error('Failed to fetch origins.');
  }
}

export async function deleteAuthorizedOrigin(originId: string) {
  try {
    await prisma.authorizedOrigin.delete({
      where: { id: originId },
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error adding origin:', error.message);
    } else {
      console.error('Error adding origin:', error);
    }
    throw new Error('Failed to delete origin.');
  }
}
