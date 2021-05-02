import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
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
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Home({ images }) {
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

  useInterval(() => {
    const nextImageIndex = currentImageIndex + 1;

    if (nextImageIndex > data.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(nextImageIndex);
    }
  }, 5000);

  const {
    data,
  } = useSWR(
    "https://573413187935667:G5myzvpLf4lSmDGPbHITs114myo@api.cloudinary.com/v1_1/hatch-limited/resources/image/tags/chibi",
    fetcher,
    { initialData: images }
  );

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <Head>
        <title>Chibi </title>
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
          imageIndex={currentImageIndex}
        />
      </body>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const imagesObjects = await fetcher(
    "https://573413187935667:G5myzvpLf4lSmDGPbHITs114myo@api.cloudinary.com/v1_1/hatch-limited/resources/image/tags/chibi"
  );

  const images = imagesObjects.resources.map((img) => {
    return img.secure_url;
  });

  return {
    props: {
      images,
    },
  };
}
