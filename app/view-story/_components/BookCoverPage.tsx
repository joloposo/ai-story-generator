import Image from 'next/image';
import React from 'react';

function BookCoverPage({ imageUrl }: { imageUrl: string }) {
    return (
        <div>
            <Image src={imageUrl} alt='cover' width={500} height={500 } />
        </div>
    );
}

export default BookCoverPage;
