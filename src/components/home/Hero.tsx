

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="border-b h- border-[#DAD3C8]">
        <div className=" container mx-auto px-4 py-12">
            <div className=" max-w-3xl mx-auto flex flex-col justify-center text-center space-x-4 ">
                <h1 className=' text-7xl md:text-6xl font-bold text-foreground leading-20 tracking-wider'>Wellcome to The Reading Room</h1>
                <p className=' mt-5 text-gray-500 text-[19px]'>Discover a world of knowledge and imagination at your    fingertips. Explore our extensive collection of books, from timeless classics to contemporary bestsellers.
                </p>
               
                <Button  className="mt-4 flex items-center gap-2 md:w-1/4 w-auto mx-auto rounded-lg p-5 bg-orange-600 text-white hover:bg-orange-500/90 transition-transform duration-300 hover:-translate-y-2 border-2 hover:border-yellow-100 ">
                    <Link href="/books" className="flex items-center gap-2 py-4">
                        Explore all books
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>

            </div>
        </div>
    </section>
  )
}

export default Hero
