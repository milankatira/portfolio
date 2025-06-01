import Image from 'next/image';
import React from 'react';

export const SlackIcon = () => {
  return (
    <Image
      src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'
      className='w-6 h-6'
      width={24}
      height={24}
      alt='slack icon'
    />
  );
};
