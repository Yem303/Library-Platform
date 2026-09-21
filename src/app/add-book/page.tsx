import AddBookForm from '@/components/add-book/AddBookForm'
import React from 'react'

const AddBook = () => {
  return (
    <div className=" py-5 px-4 min-h-screen mt-10">
      <h1 className=' text-5xl! md:text-3xl text-center text-foreground font-bold mb-3'>Add a New Book</h1>
      <p className=' text-center leading-relaxed  text-[#847062] text-[24px]'>Share a literary treasure with our comunity.</p>

      {/* From here */}
      <AddBookForm/>
    </div>
  )
}

export default AddBook
