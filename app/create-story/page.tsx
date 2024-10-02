'use client';
import React, { useContext, useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAI';
import { db } from '@/config/db';
import { StoryData, Users } from '@/config/schema';
import { v4 as uuid4 } from 'uuid';
import CustomLoader from './_components/CustomLoader';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';

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
  const { user } = useUser();
  const router = useRouter();
  const notify = (message: string) => toast(message);
  const notifyError = (message: string) => toast.error(message);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleUserSelection = (data: fieldData) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [data.fieldName]: data.fieldValue,
    }));
  };

  const GenerateStory = async () => {

    if (userDetail?.credit <= 0 ) {
        notifyError('You do not have enough credit to generate a story');
        return;
    }

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

      // Save the generated story to the database
      var response = await SaveInDB(result.response.text(), firebaseImageUrl);
      console.log('response', response);
      await UpdateUserCredit();
      notify('Story generated successfully');
      router.replace(`/view-story/${response?.[0]?.storyId}`);
      setIsLoading(false);
    } catch (error) {
      notifyError('Error while generating story');
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
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userImage: user?.imageUrl,
    };

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

  const UpdateUserCredit = async () => {
    setIsLoading(true);

    // Update the user credit
    const result = await db
      .update(Users)
      .set({ credit: userDetail?.credit - 1 })
      .where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? ''))
      .returning({ id: Users.id });

    setIsLoading(false);
  };

  return (
    <div className='min-h-screen p-10 md:px-20 lg:px-40'>
      <h2 className='font-extra bold text-[70px] text-primary text-center '>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center'>
        Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one
        story at a time.{' '}
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
      <div className='flex justify-end my-10 flex-col items-end'>
        <Button color='primary' className='p-10 text-2xl' onClick={GenerateStory} disabled={isLoading}>
          Generate Story
        </Button>
        <span className='text-black'>1 Credit will use</span>
      </div>
      <CustomLoader isLoading={isLoading} />
    </div>
  );
}

export default CreateStory;
