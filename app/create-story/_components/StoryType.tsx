'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

function StoryType({ userSelection }: any) {
  const optionList = [
    {
      label: 'Story Book',
      imageUrl: '/static/images/story.png ',
      isFree: true,
    },
    {
      label: 'Bed Story',
      imageUrl: '/static/images/bedstory.png ',
      isFree: true,
    },
    {
      label: 'Educational',
      imageUrl: '/static/images/educational.png ',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item.label,
      fieldName: 'storyType',
    });
  };

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>2. Story type</label>
      <div className='grid grid-cols-3 gap-5 mt-3'>
        {optionList.map((item, index) => (
          <div
            className={`relative grayscale hover:grayscale-0 cursor-pointer backdrop-opacity-0 p-1
            ${
              selectedOption === item.label
                ? 'grayscale-0 border-2  rounded-3xl border-primary'
                : 'backdrop-grayscale'
            }`}
            onClick={() => onUserSelect(item)}
            key={index}
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
