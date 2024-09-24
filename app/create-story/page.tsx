'use client';
import React, { useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';

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
  const [formData, setFormData] = useState<formDataType>();
  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [data.fieldName]: data.fieldValue,
    }));

    console.log('formData', formData);
  };

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extra bold text-[70px] text-primary text-center '>
        CREATE YOUR STORY
      </h2>
      <p className='text-2xl text-primary text-center'>
        Unlock your creativity with AI: Craft stories like never before! Let our
        AI bring your imagination to life, one story at a time.{' '}
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
        <Button color='primary' className='p-10 text-2xl my-10'>
          Generate Story
        </Button>
      </div>
    </div>
  );
}

export default CreateStory;
