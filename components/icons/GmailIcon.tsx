import Image from 'next/image';
import React from 'react';

export const GmailIcon = () => {
  return (
    <Image
      src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'
      className='w-6 h-6'
      width={24}
      height={24}
      alt='Gmail icon'
    />
  );
};
