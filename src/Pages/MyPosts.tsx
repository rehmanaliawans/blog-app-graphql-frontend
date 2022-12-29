import Page from "../components/Page";
import UserPostContainer from "../components/posts/UserPostContainer";

const MyPosts = () => {
  return (
    <Page title="Blog App">
      <UserPostContainer />
    </Page>
  );
};

export default MyPosts;
