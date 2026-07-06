"use client";

import { useState, useMemo } from 'react';
import styles from './community.module.css';
import DisclaimerBanner from '@/components/Community/DisclaimerBanner.jsx';
import FilterBar from '@/components/Community/FilterBar.jsx';
import PostCard from '@/components/Community/PostCard.jsx';
import Composer from '@/components/Community/Composer.jsx';
import Sidebar from '@/components/Community/Sidebar.jsx';
import EmptyState from '@/components/Community/EmptyState.jsx';
import { MOCK_POSTS } from '@/components/Community/mockData.js';

export default function CommunityFeed() {
  const [sort, setSort] = useState('Latest');
  const [region, setRegion] = useState('All');
  const [purpose, setPurpose] = useState('All');
  const [votedIds, setVotedIds] = useState([]);
  const [localPosts, setLocalPosts] = useState(MOCK_POSTS);

  // Filter + sort
  const filtered = useMemo(() => {
    let posts = [...localPosts];
    if (region !== 'All') posts = posts.filter((p) => p.region === region);
    if (purpose !== 'All') posts = posts.filter((p) => p.purpose === purpose);
    if (sort === 'Most Active') posts.sort((a, b) => (b.upvote_count + b.reply_count) - (a.upvote_count + a.reply_count));
    else posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return posts;
  }, [localPosts, sort, region, purpose]);

  const handleVote = (postId) => {
    setVotedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
    setLocalPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, upvote_count: votedIds.includes(p.id) ? p.upvote_count - 1 : p.upvote_count + 1 }
          : p
      )
    );
  };

  const handlePostCreated = (newPost) => {
    setLocalPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className={styles.feedLayout}>
      {/* Main feed column */}
      <div className={styles.feedMain}>
        <DisclaimerBanner />
        <FilterBar
          sort={sort}
          region={region}
          purpose={purpose}
          onSort={setSort}
          onRegion={setRegion}
          onPurpose={setPurpose}
        />

        <div className={styles.postList}>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                userVotedIds={votedIds}
                onVote={handleVote}
              />
            ))
          )}
        </div>
      </div>

      {/* Right column */}
      <div className={styles.feedRight}>
        <Composer isAuthenticated={false} onPostCreated={handlePostCreated} />
        <Sidebar />
      </div>
    </div>
  );
}
