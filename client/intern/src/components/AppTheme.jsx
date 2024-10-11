import Head from 'docs/src/modules/components/Head';
import PropTypes from 'prop-types';
import * as React from 'react';

export default function AppTheme(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      {children}
    </React.Fragment>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
