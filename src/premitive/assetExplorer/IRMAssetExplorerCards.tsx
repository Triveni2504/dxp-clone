import React, { useState, useEffect } from 'react';
import InfiniteScrollList from '../common/InfiniteScrollList';
import apiInstance from '../../api/apiInstance';
import { ListItemText } from '@mui/material';

interface Post {
  id: number;
  title: string;
  author: string;
  content?: string;
}

const IRMAssetExplorerCards = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(`/posts?_limit=10&_page=${page}`);
      const newPosts = response.data;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <InfiniteScrollList
      items={posts}
      next={fetchPosts}
      hasMore={hasMore}
      renderItem={(post) => (
        <ListItemText primary={post.title} secondary={post.author} />
      )}
    />
  );
};

export default IRMAssetExplorerCards;
