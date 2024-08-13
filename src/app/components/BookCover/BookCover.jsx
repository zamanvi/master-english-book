import React from 'react';
import coverPhoto from '../../../../public/image/bookCoverFs.jpg'
import appLogo from '../../../../public/image/appLogo.webp';
import Image from 'next/image';
import Link from 'next/link';
const BookCover = () => {
    return (
        <div className='w-11/12 md:w-10/12 lg:w-full mx-auto pt-5'>
            <Image src={coverPhoto} className='mx-auto md:w-7/12 lg:w-5/12  rounded-md shadow-md shadow-[#0000008f]' alt='English Book Cover' /> 

            <Link href="https://play.google.com/store/apps/details?id=com.abmn.englishhub&pcampaignid=web_share" className='flex justify-center items-center gap-x-2 mt-4'>
              <span className='font-semibold text-[15px] text-blue-500'>Download Our App</span>
              <Image className='rounded-md' width={35} src={appLogo} alt='App logo'/>
            </Link>
        </div>
    );
};

export default BookCover;