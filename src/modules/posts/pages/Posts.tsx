import { FC, useEffect } from "react";
import styled from "styled-components";
import { Post } from "../../../common/components/Post/Post";
import { useAppDispatch, useAppSelector } from "core/redux/hooks";
import { fetchGetPosts } from "../PostThunk";
import { fetchGetComments } from "modules/comments/commentsThunk";
import { Link } from "react-router-dom";
import { Spinner } from "common/components/Spinner/Spinner";

type Props = {};

export const Posts: FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const { comments } = useAppSelector((state) => state.comments);
  const token = useAppSelector((state) => state.user.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchGetPosts(token));
      dispatch(fetchGetComments(token));
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <PostsContainer>
          {posts.length
            ? posts.map((post) => {
                const obj = comments.find((c) => Number(c.postId) === post.id);
                return (
                  <Post
                    key={post.id}
                    tags
                    activity
                    post={post}
                    as={Link}
                    to={`/posts/${post.id}`}
                  />
                );
              })
            : <NoPosts>
              <NoPostText>Здесь пока нет постов!</NoPostText>
              <NoPostsLink to='/posts/addPost'>Хотите добавить?</NoPostsLink>
              </NoPosts>}
        </PostsContainer>
      )}
    </>
  );
};

const PostsContainer = styled.div`
  height: 100vh;
  max-width: 725px;
  margin: 20px auto;
`;

const NoPosts = styled.div`
  width: 100vw;
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const NoPostText = styled.p``;

const NoPostsLink = styled(Link)`
  display:block;
`
