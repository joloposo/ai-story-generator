'use client';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import React, { use, useEffect, useState } from 'react';
import { eq, desc  } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import StoryItemCard from './StoryItemCard';
import CustomLoader from '@/app/create-story/_components/CustomLoader';

export interface StoryItemType {
    id: number;
    storyId: string;
    storySubject: string;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
    output: Output;
    coverImage: string;
    userEmail: string;
    userName: string;
    userImage: string;
}

export interface Output {
    story: Story;
}

export interface Story {
    title: string;
    cover: Cover;
    chapters: Chapter[];
}

export interface Cover {
    image_prompt: string;
}

export interface Chapter {
    title: string;
    text: string;
    image_prompt: string;
}

function UserStoryList() {
    const { user } = useUser();
    const [storyList, setStoryList] = useState<StoryItemType[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        user && getUserStoryList();
    }, [user]);

    const getUserStoryList = async () => {
        // get user story list
        setLoading(true);
        const result: any = await db
            .select()
            .from(StoryData)
            .where(eq(StoryData.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''))
            .orderBy(desc(StoryData.id));
        console.log(result);
        setStoryList(result);
        setLoading(false);
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10'>
                {storyList && storyList.map((story, index) => <StoryItemCard story={story} key={index}/>)}
            </div>
            <CustomLoader isLoading={loading}/>
        </div>
    );
}

export default UserStoryList;
