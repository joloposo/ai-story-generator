'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export interface OptionField {
  label: string;
  name: string;
  imageUrl: string;
  isFree: boolean;
}

function StoryType({ userSelection }: any) {
  const optionList = [
    {
      label: 'Story Book',
      name: 'storyBook',
      imageUrl: '/story.png ',
      isFree: true,
    },
    {
      label: 'Bed Story',
      name: 'bedStory',
      imageUrl: '/bedstory.png ',
      isFree: true,
    },
    {
      label: 'Educational',
      name: 'educationalStory',
      imageUrl: '/educational.png ',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.name);
    userSelection({
      fieldValue: item.name,
      fieldName: 'storyType',
    });
  };

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>2. Story type</label>
      <div className='grid grid-cols-3 gap-5 mt-3'>
        {optionList.map((item, index) => (
          <div
            className={`relative grayscale hover:grayscale-0 cursor-pointer p-1
            ${
              selectedOption === item.name
                ? 'grayscale-0 border-2  rounded-3xl border-primary'
                : 'backdrop-grayscale'
            }`}
            onClick={() => onUserSelect(item)}
          >
            <h2 className='absolute bottom-4 text-white text-2xl text-center w-full'>
              {item.label}
            </h2>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={500}
              className='object-cover h-[260px] rounded-3xl'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryType;
