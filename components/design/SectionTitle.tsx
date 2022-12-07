import React from 'react'

const SectionTitle = ({text}:{text:string}) => {
  return (
    <div className="mt-4 flex justify-center mb-2 w-full uppercase tracking-[20px] text-gray-500 text-2xl">
      {text}
    </div>
  );
}

export default SectionTitle