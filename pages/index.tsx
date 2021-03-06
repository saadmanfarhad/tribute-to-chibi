import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Carousel from "../components/carousel";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      if (savedCallback.current != null) {
        // @ts-ignore
        savedCallback.current();
      }
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Home({ images, url }) {
  const { data } = useSWR(url, fetcher, { initialData: images });
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const nextImage = () => {
    const nextImageIndex = currentImageIndex + 1;

    if (nextImageIndex > data.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(nextImageIndex);
    }
  };

  const previousImage = () => {
    const previousImageIndex = currentImageIndex - 1;

    if (previousImageIndex < 0) {
      setCurrentImageIndex(data.length - 1);
    } else {
      setCurrentImageIndex(previousImageIndex);
    }
  };

  const setImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  useInterval(() => {
    const nextImageIndex = currentImageIndex + 1;

    if (nextImageIndex > data.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(nextImageIndex);
    }
  }, 5000);

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <Head>
        <title>Chibi</title>
        <meta
          name="description"
          content="Our memories of Chibi through camera"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Carousel
          images={data}
          nextImage={nextImage}
          previousImage={previousImage}
          setImage={setImage}
          imageIndex={currentImageIndex}
        />
      </body>
    </div>
  );
}

export async function getServerSideProps() {
  let allImages = [];

  let initialResult = await fetcher(
    `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/hatch-limited/resources/image/tags/chibi`
  );
  allImages = [...allImages, ...initialResult.resources];

  let nextCursor = initialResult.next_cursor;

  while (nextCursor) {
    const nextResult = await fetcher(
      `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/hatch-limited/resources/image/tags/chibi?next_cursor=${nextCursor}`
    );
    allImages = [...allImages, ...nextResult.resources];
    nextCursor = nextResult.next_cursor;
  }

  const images = allImages.map((img) => {
    return img.secure_url;
  });

  return {
    props: {
      images,
      url: `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/hatch-limited/resources/image/tags/chibi`,
    },
  };
}
