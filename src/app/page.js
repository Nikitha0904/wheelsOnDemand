import Head from 'next/head';
import LoginForm from './login/page';
import RequestsTable from './facultydashboard/RequestsTable';
import FacultyDashboard from './facultydashboard/page';

const Home = () => {
  return (
    <>
      <Head>
        <title>Wheels On Demand</title>
        <meta name="description" content="Wheels On Demand" />
      </Head>
      {/* <LoginForm /> */}
      <FacultyDashboard/>
    </>
  );
};

export default Home;
