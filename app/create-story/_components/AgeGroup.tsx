import React, { useState } from 'react';
import Image from 'next/image';
import { OptionField } from './StoryType';

function AgeGroup({ userSelection }: any) {
  const optionList = [
    {
      label: '0-2 Years',
      imageUrl: '/static/images/02Years.png ',
      isFree: true,
    },
    {
      label: '3-5 Years',
      imageUrl: '/static/images/35Years.png ',
      isFree: true,
    },
    {
      label: '5-8 Years',
      imageUrl: '/static/images/58Years.png ',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item.label,
      fieldName: 'ageGroup',
    });
  };

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>3. Age group</label>
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

export default AgeGroup;
