import { storage } from '@/config/firebaseConfig';
import axios from 'axios';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { url } = data;

    // const base64Image = 'data:image/png;base64,' + await convertImageToBase64(url);
    const base64Image = await convertImage(url);

    if (!base64Image) {
        return NextResponse.json({ error: 'Failed to convert image to base64' }, { status: 500 });
    }

    const filename = '/ai-story/' + Date.now() + '.png';

    const imageRef = ref(storage, filename);
    await uploadString(imageRef, base64Image, 'base64', {contentType: 'image/png'}).then((snapshot) => {
        console.log('File Uploaded');
    });

    const downloadURL = await getDownloadURL(imageRef);

    return NextResponse.json({ imageUrl: downloadURL });
}

const convertImage = async (imageUrl: string) => {
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        return base64Image;
    } catch (error) {
        console.log('Error in convertImageToBase64', error);
    }
};
