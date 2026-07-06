"use client";

import { useState } from 'react';
import styles from './PostCard.module.css';
import ReplyThread from './ReplyThread.jsx';

function formatBudget(min, max) {
  const fmt = (n) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)}Cr` : `₹${(n / 100000).toFixed(0)}L`;
  return `${fmt(min)} – ${fmt(max)}`;
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function PostCard({ post, userVotedIds = [], onVote }) {
  const [showReplies, setShowReplies] = useState(false);
  const hasVoted = userVotedIds.includes(post.id);
  const author = post.users_profile;

  return (
    <article className={styles.card} aria-label={`Post by ${author?.display_name}`}>
      {/* Header row */}
      <div className={styles.cardHeader}>
        <div className={styles.authorRow}>
          <div className={styles.avatar}>{author?.display_name?.[0] ?? '?'}</div>
          <div className={styles.authorMeta}>
            <span className={styles.authorName}>{author?.display_name ?? 'Anonymous'}</span>
            {author?.is_verified_owner && (
              <span className={styles.verifiedBadge} title="Verified Land Owner">✓ Verified</span>
            )}
          </div>
        </div>
        <span className={styles.timestamp}>{timeAgo(post.created_at)}</span>
      </div>

      {/* Tags row */}
      <div className={styles.tagsRow}>
        <span className={styles.regionTag}>{post.region}</span>
        <span className={styles.purposeTag}>{post.purpose}</span>
        <span className={styles.sizeTag}>{post.size_value} {post.size_unit}</span>
        <span className={styles.budgetTag}>{formatBudget(post.budget_min, post.budget_max)}</span>
      </div>

      {/* Description */}
      <p className={styles.description}>{post.description}</p>

      {/* Footer actions */}
      <div className={styles.cardFooter}>
        <button
          id={`upvote-${post.id}`}
          className={`${styles.actionBtn} ${styles.upvoteBtn} ${hasVoted ? styles.voted : ''}`}
          onClick={() => onVote?.(post.id)}
          aria-label={`Upvote this post. Current count: ${post.upvote_count}`}
          aria-pressed={hasVoted}
        >
          <span className={styles.upvoteIcon}>▲</span>
          <span>{post.upvote_count}</span>
        </button>

        <button
          id={`replies-${post.id}`}
          className={`${styles.actionBtn} ${styles.replyBtn} ${showReplies ? styles.replyActive : ''}`}
          onClick={() => setShowReplies(!showReplies)}
          aria-expanded={showReplies}
          aria-label={`${showReplies ? 'Hide' : 'Show'} ${post.reply_count} replies`}
        >
          <span>💬</span>
          <span>{post.reply_count} {post.reply_count === 1 ? 'Reply' : 'Replies'}</span>
        </button>

        <button
          id={`report-${post.id}`}
          className={`${styles.actionBtn} ${styles.reportBtn}`}
          aria-label="Report this post"
          title="Report"
        >
          ⚑
        </button>
      </div>

      {/* Reply thread (lazy) */}
      {showReplies && (
        <ReplyThread postId={post.id} replyCount={post.reply_count} />
      )}
    </article>
  );
}
