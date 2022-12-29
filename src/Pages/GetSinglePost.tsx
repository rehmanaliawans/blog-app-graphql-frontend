import React from "react";
import Page from "../components/Page";
import { GetSinglePostContainer } from "../components/posts/getSinglePost";

const GetSinglePost = () => {
  return (
    <Page title="Get Post">
      <GetSinglePostContainer />
    </Page>
  );
};

export default GetSinglePost;
