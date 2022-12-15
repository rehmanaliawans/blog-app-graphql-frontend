import { Helmet } from "react-helmet-async";
import React, { forwardRef } from "react";
import { Box } from "@mui/material";

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
