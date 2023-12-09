import React from 'react';
import styles from './page.module.css';
import { fetchData } from './firebase';

// Components
import Piece from './components/Piece';
import Header from './components/Header';

export async function getData() {
  const res = await fetchData();

  if (!res) {
    throw new Error('Failed to fetch data')
  }
  return res;
};

export default async function Home() {
  const data = await getData();

  const transformData = () => {
    return Object.values(data.work).map(workItem => {
      const imageObj = data.image[workItem.id];
      const images = imageObj ? Object.values(imageObj).map(item => item.imageURL) : [];
      return { ...workItem, images };
    });
  };
  
  const transformed = await transformData();

  return (
    <>
    <Header />
    <div className={styles.container}>
      {transformed.map((item) => (
        <Piece key={item.id} {...item} />
        ))}
    </div>
    </>
  );
};
