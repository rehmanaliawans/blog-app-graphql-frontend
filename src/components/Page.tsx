import { Box } from '@mui/material';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';

type PageProps = {
  children: React.ReactNode;
  title: string;
};
const Page = forwardRef(
  ({ children, title = "", ...other }: PageProps, ref) => (
    <>
      <Helmet>
        <title>{`${title}`}</title>
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
