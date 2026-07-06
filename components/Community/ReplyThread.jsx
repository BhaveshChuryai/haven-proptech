"use client";

import { useState } from 'react';
import styles from './ReplyThread.module.css';
import { MOCK_REPLIES } from './mockData.js';

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ReplyThread({ postId, replyCount }) {
  const replies = MOCK_REPLIES[postId] ?? [];
  const [replyText, setReplyText] = useState('');
  const [localReplies, setLocalReplies] = useState(replies);
  const [submitted, setSubmitted] = useState(false);

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const newReply = {
      id: `temp-${Date.now()}`,
      post_id: postId,
      user_id: 'guest',
      body: replyText.trim(),
      created_at: new Date().toISOString(),
      users_profile: { display_name: 'You', is_verified_owner: false },
    };
    setLocalReplies((prev) => [...prev, newReply]);
    setReplyText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={styles.thread}>
      <div className={styles.threadLine} />

      <div className={styles.replyList}>
        {localReplies.length === 0 && (
          <p className={styles.noReplies}>No replies yet. Be the first to respond.</p>
        )}
        {localReplies.map((r) => (
          <div key={r.id} className={styles.reply}>
            <div className={styles.replyHeader}>
              <div className={styles.replyAvatar}>{r.users_profile?.display_name?.[0] ?? '?'}</div>
              <span className={styles.replyAuthor}>{r.users_profile?.display_name ?? 'Anonymous'}</span>
              {r.users_profile?.is_verified_owner && (
                <span className={styles.verifiedMini}>✓</span>
              )}
              <span className={styles.replyTime}>{timeAgo(r.created_at)}</span>
            </div>
            <p className={styles.replyBody}>{r.body}</p>
          </div>
        ))}
      </div>

      {/* Reply composer */}
      <form className={styles.replyForm} onSubmit={handleReply}>
        <input
          id={`reply-input-${postId}`}
          className={styles.replyInput}
          type="text"
          placeholder="Write a reply... (Login required to post live)"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          maxLength={300}
        />
        <button type="submit" className={styles.replySubmit} id={`reply-submit-${postId}`}>
          Reply
        </button>
      </form>
      {submitted && <p className={styles.successNote}>Reply added (preview only — login to post live)</p>}
    </div>
  );
}
