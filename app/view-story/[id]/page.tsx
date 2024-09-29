'use client';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import React, { use, useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';
import LastPage from '../_components/LastPage';

function ViewStory({ params }: any) {
    const [story, setStory] = useState<any>();
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
        <div className='p-10 md:px-20 lg:px-40'>
            <h2 className='font-bold text-4xl bg-primary text-center p-10 text-white'>{story?.output?.story?.title}</h2>

            {/* @ts-ignore */}
            <HTMLFlipBook width={500} height={500} showCover={true} className='mt-10'>
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
        </div>
    );
}

export default ViewStory;
