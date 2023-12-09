import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({imageArr} : { imageArr: string[] }) {
  const [index, setIndex] = useState(0);
  
  const BackButton = () => {
    return (
      <button
        className={`${styles.changeImageButton} ${styles.back}`}
        onClick={() => setIndex(prev => prev-1)}
      ><span className={`${styles.chevron} ${styles.left}`}></span>
      </button>
    );
  }

  const ForwardButton = () => {
    return (
      <button
      className={`${styles.changeImageButton} ${styles.forward}`}
        onClick={() => setIndex(prev => prev+1)}
      ><span className={`${styles.chevron} ${styles.right}`}></span>
      </button>
    );
  }

  return (
    <>
    <img 
      className={styles.windowImage}
      src={imageArr[index]}
    />
    {!(index === 0) ? <BackButton /> : <></>}
    {!(index === (imageArr.length-1))  ? <ForwardButton /> : <></>}
    </>
  )
}