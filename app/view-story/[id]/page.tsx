'use client';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import React, { use, useEffect, useState, useRef } from 'react';
import { eq } from 'drizzle-orm';
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';
import LastPage from '../_components/LastPage';
import { Button } from '@nextui-org/button';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

function ViewStory({ params }: any) {
    const [story, setStory] = useState<any>();
    const [count, setCount] = useState(0);
    const book = useRef();

    useEffect(() => {
        console.log('params.id', params.id);
        getStory();
    }, [params]);

    const getStory = async () => {
        const result = await db.select().from(StoryData).where(eq(StoryData.storyId, params.id));

        console.log(result[0]);
        setStory(result[0]);
    };

    return (
        <div className='p-10 md:px-20 lg:px-40 flex-col'>
            <h2 className='font-bold text-4xl bg-primary text-center p-10 text-white'>{story?.output?.story?.title}</h2>
            <div className='relative'>
                {/* @ts-ignore */}
                <HTMLFlipBook
                    width={500}
                    height={500}
                    showCover={true}
                    className='mt-10'
                    useMouseEvents={false}
                    ref={book}
                >
                    <div>
                        <BookCoverPage imageUrl={story?.coverImage} />
                    </div>
                    {[...Array(story?.output?.story?.chapters.length)].map((item, index) => (
                        <div key={index} className='bg-white p-10 border'>
                            <StoryPages storyChapter={story?.output?.story?.chapters[index]} />
                        </div>
                    ))}

                    {/* <div>
                    <LastPage />
                </div> */}
                </HTMLFlipBook>
                {count != 0 && (
                    <div
                        className='absolute -left-6 top-[250px]'
                        onClick={() => {
                            // @ts-ignore
                            book.current.pageFlip().flipPrev();
                            setCount(count - 1);
                        }}
                    >
                        <IoIosArrowDropleftCircle className='text-5xl text-primary cursor-pointer' />
                    </div>
                )}
                {count != (story?.output?.story?.chapters.length-1) && (
                    <div
                        className='absolute -right-6 top-[250px]'
                        onClick={() => {
                            // @ts-ignore
                            book.current.pageFlip().flipNext();
                            setCount(count + 1);
                        }}
                    >
                        <IoIosArrowDroprightCircle className='text-5xl text-primary cursor-pointer' />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewStory;
