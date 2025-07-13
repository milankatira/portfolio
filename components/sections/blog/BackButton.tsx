"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
    const handleBack = () => {
        router.back();
    }
    return (
        <div className="flex justify-start items-center mb-4 cursor-pointer"
            onClick={handleBack}
        >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </div>

    )
}

export default BackButton
