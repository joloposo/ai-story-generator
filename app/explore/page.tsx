'use client';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import React, { useEffect, useState } from 'react';
import { desc } from 'drizzle-orm'; // Replace 'some-library' with the actual library name
import { StoryItemType } from '../dashboard/_components/UserStoryList';
import StoryItemCard from '../dashboard/_components/StoryItemCard';
import { Button } from '@nextui-org/button';

function ExploreMore() {
  const [offset, setOffset] = useState<number>(0);
  const [storyList, setStoryList] = useState<StoryItemType[]>([]);

  useEffect(() => {
    GetAllStories(0);
  }, []);

  const GetAllStories = async (offset: number) => {
    setOffset(offset);
    const result: any = await db.select().from(StoryData).orderBy(desc(StoryData.id)).limit(8).offset(offset);
    console.log('GetAllStories', result);
    setStoryList((prev) => [...prev, ...result]);
  };

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40'>
      <h2 className='text-4xl font-bold text-primary text-center'>Explore More Stories</h2>
      <div className='grid gridco1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10'>
        {storyList.map((story: StoryItemType, index) => (
          <StoryItemCard key={index} story={story} />
        ))}
      </div>
      <div className='text-center '>
        <Button className='mt-10 ' color='primary' onClick={() => GetAllStories(offset + 8)}>
          Load More
        </Button>
      </div>
    </div>
  );
}

export default ExploreMore;
