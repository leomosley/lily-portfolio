'use client';
import React, { useState, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import styles from './Piece.module.css';

// Components
import ContentWindow from './ContentWindow';

interface Props  {
  name: string;
  images: string[];
  id: string;
  date: string;
  description: string;
  type: string;
}

interface ContextType {
  contentWindowOpen?: boolean;
  setContentWindowOpen?: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextType>({});

export default function Piece({ name, images, id, date, description, type } : Props ) {
  const [contentWindowOpen, setContentWindowOpen] = useState<boolean>(false);
  const [landscape, setLandscape] = useState<boolean>(false);

  const openContentWindow = () => {
    setContentWindowOpen(true);
    document.body.style.overflowY = "hidden";
  };

  const contentWindowProps = {
    name, 
    images, 
    date, 
    description, 
    type
  };

  useEffect(() => {
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      setLandscape(img.width > img.height);
    };
  }, [images]);

  return (
    <>
    <Context.Provider value={{contentWindowOpen, setContentWindowOpen}}>
      <ContentWindow {...contentWindowProps}/>
    </Context.Provider>
    <div className={`${styles.piece} ${landscape? styles.landscape : ''}`}  onClick={openContentWindow}>
      <img
        className={styles.image}
        src={images[0]}
        alt={name}
      />
      <div className={styles.textContainer}>
        <span className={styles.text}>{name}</span>  
      </div>
    </div>
    </>
  );
}
