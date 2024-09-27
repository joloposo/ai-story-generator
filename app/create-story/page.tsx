'use client';
import React, { useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAI';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { v4 as uuid4 } from 'uuid';
import CustomLoader from './_components/CustomLoader';
import axios from 'axios';

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;
export interface fieldData {
    fieldValue: string;
    fieldName: string;
}

export interface formDataType {
    storySubject: string;
    storyType: string;
    ageGroup: string;
    imageStyle: string;
}

function CreateStory() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<formDataType>();
    const onHandleUserSelection = (data: fieldData) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [data.fieldName]: data.fieldValue,
        }));

        console.log('formData', formData);
    };

    const GenerateStory = async () => {
        setIsLoading(true);

        const FINAL_PROMPT = CREATE_STORY_PROMPT?.replace('{ageGroup}', formData?.ageGroup ?? '')
            .replace('{storyType}', formData?.storyType ?? '')
            .replace('{storySubject}', formData?.storySubject ?? '')
            .replace('{imageStyle}', formData?.imageStyle ?? '');

        // API Call to generate story
        try {
            console.log('FINAL_PROMPT', FINAL_PROMPT);
            const result = await chatSession.sendMessage(FINAL_PROMPT);

            const storyJson = JSON.parse(result.response.text());

            const prompt =
                'Add text with title: ' +
                storyJson.story?.title +
                ' in bold text for book cover, ' +
                storyJson.story?.cover?.image_prompt;

            const imageResp = await axios.post('/api/generate-image', {
                prompt: prompt,
            });

            const AiImageUrl = imageResp?.data?.imageUrl;
            const imageResult = await axios.post('/api/save-image', {
                url: AiImageUrl,
            });

            const firebaseImageUrl = imageResult?.data?.imageUrl;
            console.log(firebaseImageUrl);

            // Save the generated story to the database
            var response = await SaveInDB(result.response.text(), firebaseImageUrl);
            setIsLoading(false);
        } catch (error) {
            console.error('Error while generating story', error);
            setIsLoading(false);
        }

        // Save the generated story to the database

        // Generate Image
    };

    const SaveInDB = async (output: string, firebaseImageUrl: string) => {
        setIsLoading(true);

        const recordId = uuid4();

        // Save the generated story to the database
        const data = {
            storyId: recordId,
            storySubject: formData?.storySubject,
            storyType: formData?.storyType,
            ageGroup: formData?.ageGroup,
            imageStyle: formData?.imageStyle,
            output: JSON.parse(output),
            coverImage: firebaseImageUrl,
        };

        console.log('data', data);

        try {
            // Save the data to the database
            const result = await db.insert(StoryData).values(data).returning({ storyId: StoryData?.storyId });

            setIsLoading(false);

            return result;
        } catch (error) {
            console.error('Error while saving data to the database', error);
            setIsLoading(false);
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-40'>
            <h2 className='font-extra bold text-[70px] text-primary text-center '>CREATE YOUR STORY</h2>
            <p className='text-2xl text-primary text-center'>
                Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to
                life, one story at a time.{' '}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
                {/* Story Subject */}
                <StorySubjectInput userSelection={onHandleUserSelection} />
                {/* Story Type */}
                <StoryType userSelection={onHandleUserSelection} />
                {/* Age Group */}
                <AgeGroup userSelection={onHandleUserSelection} />
                {/* Image Style */}
                <ImageStyle userSelection={onHandleUserSelection} />
            </div>
            <div className='flex justify-end'>
                <Button color='primary' className='p-10 text-2xl my-10' onClick={GenerateStory} disabled={isLoading}>
                    Generate Story
                </Button>
            </div>
            <CustomLoader isLoading={isLoading} />
        </div>
    );
}

export default CreateStory;
