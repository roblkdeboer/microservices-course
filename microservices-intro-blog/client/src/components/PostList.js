import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');

    // Posts are returned from the endpoint and assigned to posts variable
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //   An  array of post objects
  //   Each post has an id that is returned from the API
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card my-3" style={{ width: '30%' }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
