import React, { useState } from 'react';
import Image from 'next/image';
import { OptionField } from './StoryType';

function ImageStyle({ userSelection }: any) {
  const optionList = [
    {
      label: '3D Cartoon',
      imageUrl: '/static/images/3D.png ',
      isFree: true,
    },
    {
      label: 'Paper Cut',
      imageUrl: '/static/images/paperCut.png ',
      isFree: true,
    },
    {
      label: 'Water Color',
      imageUrl: '/static/images/watercolor.png ',
      isFree: true,
    },
    {
      label: 'Pixel Style',
      imageUrl: '/static/images/pixel.png ',
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>();
  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
    userSelection({
      fieldValue: item.label,
      fieldName: 'imageStyle',
    });
  };

  return (
    <div>
      <label className='font-bold text-4xl text-primary'>4. Image Style</label>
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
              className='object-cover h-[120px] rounded-3xl'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageStyle;
