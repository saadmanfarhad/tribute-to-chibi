import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tribute to Chibi</title>
        <meta
          name="description"
          content="Our memories of Chibi through camera"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
