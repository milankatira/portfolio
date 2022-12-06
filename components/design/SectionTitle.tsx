import React from 'react'

const SectionTitle = ({text}:{text:string}) => {
  return (
     <div className="flex justify-center mb-2 text-2xl w-full tracking-wider font-semibold">
        {text}
      </div>
  )
}

export default SectionTitle