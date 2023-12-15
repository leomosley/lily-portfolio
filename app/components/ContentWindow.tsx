import React, { useState, useContext, useLayoutEffect } from 'react';
import styles from './ContentWindow.module.css';

import ImageCarousel from './ImageCarousel';
import { Context } from './Piece';

interface Props {
  name: string;
  images: string[];
  date: string;
  description: string;
  type: string;
}

export default function ContentWindow ({  name, images, date, description, type } : Props) {
  const { contentWindowOpen, setContentWindowOpen } = useContext(Context);
  const [landscape, setLandscape] = useState<boolean>(false);

  useLayoutEffect(() => {
    const checkImages = async () => {
      for (let i in images) {
        const imageInfo: Image = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = images[i];
        });

        if (imageInfo.width > imageInfo.height) {
          setLandscape(true);
          break;
        }
      }
    };

    checkImages();
  }, [images]);
  
  const closeContentWindow = () => {
    if (setContentWindowOpen) {
      setContentWindowOpen(false);
    }
    document.body.style.overflowY = "auto";
  }

  return contentWindowOpen && (
    <>
    <div 
      className={styles.mask} 
      onClick={closeContentWindow}
    ></div>
    <div className={`${styles.window} ${landscape? styles.landscape : ''}`}>
      <button
        className={`${styles.close} ${landscape? styles.landscape : ''}`}
        onClick={closeContentWindow}
      >
        <span className={`${styles.cross} ${landscape? styles.landscape : ''}`}>&times;</span>
      </button>
      <div className={styles.content}>
        <ImageCarousel landscape={landscape} imageArr={images} />
        <div className={styles.header}>
          <p className={styles.title}>{name}</p>
          <p className={styles.type}>{type}</p>
          <div className={`${styles.mainLand} ${landscape? styles.show : ''}`}>
            <p className={styles.mainText}>{description}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.main} ${landscape? styles.hide : ''}`}>
        <p className={styles.mainText}>{description}</p>
      </div>
    </div>
    </>
  );
}