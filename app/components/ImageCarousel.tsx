import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ imageArr, landscape } : { imageArr: string[], landscape: boolean }) {
  const [index, setIndex] = useState(0);

  const BackButton = () => {
    return (
      <button
        className={`${styles.button} ${styles.back}`}
        onClick={() => setIndex(prev => prev-1)}
      ><span className={`${styles.chevron} ${styles.left}`}></span>
      </button>
    );
  }

  const ForwardButton = () => {
    return (
      <button
      className={`${styles.button} ${styles.forward} ${landscape? styles.landscape : ''}`}
        onClick={() => setIndex(prev => prev+1)}
      ><span className={`${styles.chevron} ${styles.right}`}></span>
      </button>
    );
  }

  return (
    <div className={`${styles.container} ${landscape? styles.landscape : ''}`}>
      <img className={styles.image} src={imageArr[index]} />
      {!(index === 0) ? <BackButton /> : <></>}
      {!(index === (imageArr.length-1))  ? <ForwardButton /> : <></>}
    </div>
  )
}