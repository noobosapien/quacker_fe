import type { NextPage } from 'next';
import Head from 'next/head';
import Content from '../components/Content';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lethal Duckies!</title>
        <meta name="description" content="Lethal duckies of outer space." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content />
    </div>
  );
};

export default Home;
