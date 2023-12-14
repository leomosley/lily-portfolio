import React from 'react';
import styles from './page.module.css';
import { fetchData } from './firebase';

// Components
import Piece from './components/Piece';
import Header from './components/Header';

interface Image {
  imageURL: string;
}

interface Work {
  date: string;
  description: string;
  id: string;
  name: string;
  type: string;
  images?: string[];
}

export async function getData(): Promise<Array<Work & { images: string[]}>> {
  const data = await fetchData();

  if (!data) {
    throw new Error('Failed to fetch data')
  }

  const transformedData = (Object.values(data.work) as Work[]).map((workItem: Work) => {
    const imageObj = data.image[workItem.id];
    const images: string[] = imageObj ? (Object.values(imageObj) as Image[]).map((imageItem: Image)=> imageItem.imageURL) : [];
    return { ...workItem, images };
  });
  
  return transformedData;
};

export default async function Home() {
  const data = await getData();

  return (
    <>
    <Header />
    <div className={styles.container}>
      {data.map((item) => (
        <Piece key={item.id} {...item} />
        ))}
    </div>
    </>
  );
};
