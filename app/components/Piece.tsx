'use client';
import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import styles from './Piece.module.css';

// Components
import ContentWindow from './ContentWindow';

type Props = {
  name: string;
  images: string[];
  id: string;
  date: string;
  description: string;
  type: string;
}

type ContextType = {
  contentWindowOpen?: boolean;
  setContentWindowOpen?: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextType>({});

export default function Piece({ name, images, id, date, description, type } : Props ) {
  const [contentWindowOpen, setContentWindowOpen] = useState<boolean>(false);

  const openContentWindow = () => {
    setContentWindowOpen(true);
    document.body.style.overflowY = "hidden";
  }

  const contentWindowProps = {
    name, 
    images, 
    date, 
    description, 
    type
  }

  return (
    <>
    <Context.Provider value={{contentWindowOpen, setContentWindowOpen}}>
      <ContentWindow {...contentWindowProps}/>
    </Context.Provider>
    <div className={`${styles.piece}`}  onClick={openContentWindow}>
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
