import Image from 'next/image';
import React from 'react';

export const DiscordIcon = () => {
  return (
    <Image
      src='https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png'
      className='w-6 h-6'
      width={24}
      height={24}
      alt='slack icon'
    />
  );
};
