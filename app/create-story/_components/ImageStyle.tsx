import React, { useState } from 'react'
import Image from 'next/image'
import { OptionField } from './StoryType';

function ImageStyle({userSelection}: any) {
    const optionList = [
        {
          label: '3D Cartoon',
          name: '3DCartoon',
          imageUrl: '/3D.png ',
          isFree: true,
        },
        {
          label: 'Paper Cut',
          name: 'paperCut',
          imageUrl: '/paperCut.png ',
          isFree: true,
        },
        {
          label: 'Water Color',
          name: 'waterColor',
          imageUrl: '/watercolor.png ',
          isFree: true,
        },
        {
            label: 'Pixel Style',
            name: 'pixelStyle',
            imageUrl: '/pixel.png ',
            isFree: true,
          },
      ];
    
      const [selectedOption, setSelectedOption] = useState<string>();
      const onUserSelect = (item: OptionField) => {
        setSelectedOption(item.name);
        userSelection({
          fieldValue: item.name,
          fieldName: 'imageStyle',
        });
      };

      return (
        <div>
          <label className='font-bold text-4xl text-primary'>4. Image Style</label>
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
                  className='object-cover h-[120px] rounded-3xl'
                />
              </div>
            ))}
          </div>
        </div>
      );
}

export default ImageStyle