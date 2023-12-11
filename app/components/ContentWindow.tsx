'use client';
import React, { useState, useContext } from 'react';
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
    <div className={styles.window}>
      <button
        className={styles.close}
        onClick={closeContentWindow}
      >
        <span>&times;</span>
      </button>
      <ImageCarousel imageArr={images} />
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.title}>{name}</p>
          <p className={styles.type}>{type}</p>
        </div>
        <div className={styles.main}>
          <p className={styles.mainText}>{description}</p>
        </div>
      </div>
    </div>
    </>
  );
}