import { Button } from '@nextui-org/button';
import React from 'react';

function LastPage() {
    return (
        <div className='bg-primary p-10 h-full'>
            <h2 className='text-2xl font-bold text-white text-center'>The End</h2>
            <div className='flex text-center items-center'>
                <Button>Share</Button>
            </div>
        </div>
    );
}

export default LastPage;
