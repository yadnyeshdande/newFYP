'use client';
import { useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import './Gallery.css';
const ImageGallery = () => {
  let data = [
    {
      id: 1,
      imgsrc:
        'https://wallpapers.com/images/high/sai-pallavi-focus-photograph-tx1gtexi52z0pp89.webp',
    },
    {
      id: 2,
      imgsrc:
        'https://wallpapers.com/images/high/sai-pallavi-elegant-earrings-h7fewrnq5hmjpxvz.webp',
    },
    {
      id: 3,
      imgsrc:
        'https://wallpapers.com/images/high/sai-pallavi-side-view-aepjwid63oxdc1ly.webp',
    },
    {
      id: 4,
      imgsrc:
        'https://wallpapers.com/images/hd/batman-arkham-origins-nsl7ff2rnlsbuau6.webp',
    },
    {
      id: 5,
      imgsrc:
        'https://wallpapers.com/images/high/spider-man-aesthetic-0f74grzoj0jjpp7n.webp',
    },
    {
      id: 6,
      imgsrc:
        'https://wallpapers.com/images/high/iron-man-power-gesture-vua70ols5yhwkb49.webp',
    },
  ];

  const [model, setmodel] = useState(false);
  const [tempimgsrc, settempimgsrc] = useState('');

  const getImg = (imgsrc) => {
    settempimgsrc(imgsrc);
    setmodel(true);
  };
  return (
    <section className="text-gray  body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex w-full mb-20 flex-wrap">
          <h1 className="sm:text-5xl text-2xl font-extrabold title-font text-primary lg:w-1/3 lg:mb-0 mb-4">
            Gallery
          </h1>
          <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div className="mt-16">
          <div
            className={
              model
                ? 'w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black visible opacity-1 overflow-hidden z-50'
                : 'w-full h-screen fixed top-0 left-0 bg-black invisible opacity-0 overflow-hidden z-50'
            }
          >
            <img
              className="w-auto h-auto max-w-full max-h-full block"
              src={tempimgsrc}
              alt=""
            />
            <Cross1Icon
              className="fixed w-8 h-8 text-white inset-6 cursor-pointer"
              onClick={() => setmodel(false)}
            />
          </div>

          <div className="Gallery">
            {data.map((item, index) => {
              return (
                <div
                  className="pics"
                  key={index}
                  onClick={() => {
                    getImg(item.imgsrc);
                  }}
                >
                  <img src={item.imgsrc} alt="" className="w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
