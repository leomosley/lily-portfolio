'use client';
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [hide, setHide] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setHide(true);
      } else {
        setHide(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLeave = () => {
    if (window.scrollY) {
      setHide(true);
    }
  }

  return (
    <div 
      className={`${styles.container} ${hide? styles.hide : ''}`}
      onMouseEnter={() => setHide(false)} 
      onMouseLeave={handleLeave} 
    >
      <span className={styles.text}>Lily Timns Portfolio</span>
    </div>
  )
}
