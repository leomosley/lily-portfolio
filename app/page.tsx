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

interface Work {
  date: string;
  description: string;
  id: string;
  name: string;
  type: string;
  
}

interface Image {
  imageURL: string;
}

export default async function Home() {
  const data = await getData();

  const transformData = (): Array<Work & { images: string[] }> => {
    return (Object.values(data.work) as Work[]).map((workItem: Work) => {
      const imageObj = data.image[workItem.id];
      const images: string[] = imageObj ? (Object.values(imageObj) as Image[]).map((imageItem: Image)=> imageItem.imageURL) : [];
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
