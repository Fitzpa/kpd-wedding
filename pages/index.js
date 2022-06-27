import Head from "next/head";
import styles from "../styles/Home.module.css";
import UploadForm from "../src/components/UploadForm";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Katie & Louie's Wedding Gallery</title>
        <meta
          name="description"
          content="Wedding photo album for Louie Fitzpatrick and Katie Pendleton"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <UploadForm />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
