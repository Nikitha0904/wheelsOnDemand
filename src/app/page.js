import Head from 'next/head';
import LoginForm from './login/page';

const Home = () => {
  return (
    <>
      <Head>
        <title>Wheels On Demand</title>
        <meta name="description" content="Wheels On Demand" />
      </Head>
      <LoginForm />
    </>
  );
};

export default Home;
