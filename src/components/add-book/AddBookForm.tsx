"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Card } from '../ui/card'
import {Input } from '@base-ui/react'
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { BookPlus } from 'lucide-react';
const porpularGenres =[
    "Classics",
    "Fiction",
    "Romance",
    "Drama",
    "Gothic",
    "Dystopian",
    "Adventure",
    "Poetry",
    "Mystery",
    "Fantasy",
];
const AddBookForm = () => {
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmissionMessage("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const cover = formData.get("cover");

        if (!selectedGenre) {
            setSubmissionMessage("Please choose a genre.");
            return;
        }

        if (!(cover instanceof File) || cover.size === 0) {
            setSubmissionMessage("Please select a cover image.");
            return;
        }

        if (cover.size > 2 * 1024 * 1024) {
            setSubmissionMessage("Cover images must be smaller than 2 MB.");
            return;
        }

        const coverUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(new Error("Could not read cover image."));
            reader.readAsDataURL(cover);
        });

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/books", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.get("title"),
                    author: formData.get("author"),
                    genre: selectedGenre,
                    description: formData.get("description"),
                    publishedYear: Number(formData.get("publishedYear")),
                    coverUrl,
                    isFavorite: false,
                    isBorrowed: false,
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Could not add the book.");
            }

            form.reset();
            setSelectedGenre("");
            setCoverPreview(null);
            setSubmissionMessage("Book added to the library.");
            window.dispatchEvent(new Event("books-updated"));
        } catch (error) {
            setSubmissionMessage(
                error instanceof Error ? error.message : "Could not add the book."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

  return (
    <div>
      <Card className='p-8 max-w-3xl mx-auto shadow-lg border border-gray-200'>
        <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2 mb-4 space-y-2'>
                <label htmlFor="title" className='font-bold text-lg'>
                    Book Title *
                </label>
                <Input 
                    id="title" 
                    name="title"
                    placeholder="Enter the book title" 
                    required 
                    className='h-12 text-base! border border-gray-300 p-2' 
                 />
            </div>
            <div className='flex flex-col gap-2 mb-4 space-y-2'>
                <label htmlFor="author" className='font-bold text-lg' >
                    Author *
                </label>
                <Input 
                    id="author"
                    name="author" 
                    placeholder="Enter the author's name" 
                    required 
                    className='h-12 text-base! border border-gray-200 p-2' 
                />
            </div>

            <div>
                <label htmlFor='cover' className=' font-bold text-lg'>
                    Cover Image *
                </label>
                <div>
                    <div className='mt-2 w-32 h-48 bg-muted flex items-center justify-center border border-gray-300 rounded-md overflow-hidden '>
                        {coverPreview ? 
                        (<Image src={coverPreview} alt='cover preview' width={128} height={192} unoptimized className=' w-full h-full object-cover'/>): 
                        (<div>No cover select:</div>)}
                    </div>
                </div>
                <div className=' flex-1'>
                    <input 
                        id='cover'
                        name='cover'
                        type='file' 
                        accept='image/*'
                        required
                        onChange={(e)=>{
                            const file = e.target.files?.[0]?? null;
                            // if no file is selected, reset the preview
                            if(!file){
                                setCoverPreview(null);
                                return;
                            }
                            // create a preview url for the selected file
                            if(file){
                                const previewUrl = URL.createObjectURL(file);
                                setCoverPreview(previewUrl);
                            }
                        }}
                        className=' block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E6B81D] file:text-white hover:file:bg-[#E6B81D]/80 mt-2'
                    />
                </div>
                {/* genre */}
                <div className='space-y-3 mt-10'>
                    <label htmlFor='genre' className=' font-semibold text-lg'>
                        Genre *
                    </label>
                    <div className='flex flex-wrap gap-2 mt-2 '>
                        {porpularGenres.map((genre)=>(
                            <Button
                             key={genre} 
                             type='button' 
                             variant={selectedGenre === genre ? "default" : "outline"} 
                             onClick={()=>setSelectedGenre(genre)}
                             className={' font-semibold p-4 rounded-full transition-transform duration-300 hover:-translate-y-1 border-2 hover:border-gray-300'}>{genre}
                             </Button>
                        ))}
                    </div>
                </div>
                {/* End genre */}

                {/* textArea */}
                <div className='space-y-2 mt-5'>
                    <label htmlFor='description' className=' font-semibold text-lg'>Description *</label>
                    <Textarea
                        id='description'
                        name='description'
                        placeholder='Tell us about this book...'
                        rows={6}
                        required
                        className=' resize-none text-base!'
                    />
                   
                </div>
                {/* End textArea */}
                {/* Input publishedyear */}
                <div className=' space-y-2 flex flex-col mt-5'>
                    <label htmlFor='publishedYear' className=' font-semibold text-lg'>Published Year *</label>
                    <Input
                        id='publishedYear'
                        name='publishedYear'
                        type='number'
                        placeholder='1992'
                        min={1000}
                        max={new Date().getFullYear()}
                        className='h-12 text-base! border border-gray-300 p-2'
                    />
                </div>
                {/* Button add book to library */}
                <div className='p-2'>
                    <Button type='submit' size={"lg"} className={"w-full p-4"} disabled={isSubmitting}>
                        <BookPlus className=' w-5 h-5 mr-2'/> {isSubmitting ? "Adding..." : "Add to library"}
                    </Button>
                </div>
                {submissionMessage && (
                    <p className='text-center text-sm font-medium' role='status'>
                        {submissionMessage}
                    </p>
                )}
            </div>
        </form>
      </Card>
    </div>
  )
}

export default AddBookForm
