'use server';

import prisma from '@/lib/prisma';
import { fetchCurrentUser } from './auth.action';

export async function addEmailConnection(email: string) {
  const auth = await fetchCurrentUser();
  if (!auth?.id) throw new Error('Unauthorized');

  return await prisma.connections.create({
    data: {
      type: 'Email',
      email,
      userId: auth?.id,
    },
  });
}

export async function removeEmailConnection(id: string) {
  const auth = await fetchCurrentUser();
  if (!auth?.id) throw new Error('Unauthorized');

  return await prisma.connections.delete({
    where: {
      id,
      userId: auth.id,
    },
  });
}

export async function findConnectionByUserId() {
  try {
    const auth = await fetchCurrentUser();
    const connection = await prisma.connections.findMany({
      where: { userId: auth.id },
    });

    return connection;
  } catch (error) {
    console.error('Error finding connection by userId:', error);
    throw new Error('Unable to find connection');
  }
}
