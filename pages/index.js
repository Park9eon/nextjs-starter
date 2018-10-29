import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import withAuth from '../lib/withAuth';
import Public from '../components/Public';
import Private from '../components/Private';

const Index = ({ user }) => (
  <div>
    <Head>
      <title>Nextjs start</title>
    </Head>
    {user && <span>Signed in</span>}
    <Public/>
    { user && <Private/> }
  </div>
);

Index.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  user: null,
};

export default withAuth(Index, { loginRequired: false });
