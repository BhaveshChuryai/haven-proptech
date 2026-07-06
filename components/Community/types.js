// Community data types (JS version — swap for generated Supabase TS types when live)

/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} display_name
 * @property {boolean} is_verified_owner
 * @property {string} created_at
 */

/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} user_id
 * @property {string} region
 * @property {string} purpose
 * @property {number} budget_min
 * @property {number} budget_max
 * @property {number} size_value
 * @property {string} size_unit
 * @property {string} description
 * @property {number} upvote_count
 * @property {number} reply_count
 * @property {string} created_at
 * @property {UserProfile} [users_profile]
 */

/**
 * @typedef {Object} Reply
 * @property {string} id
 * @property {string} post_id
 * @property {string} user_id
 * @property {string} body
 * @property {string} created_at
 * @property {UserProfile} [users_profile]
 */

/**
 * @typedef {'Latest' | 'Most Active'} SortMode
 * @typedef {'Lonavala' | 'Karjat' | 'Igatpuri' | 'Goa' | 'Other' | 'All'} RegionFilter
 * @typedef {'Investment' | 'Personal Use' | 'Resale' | 'All'} PurposeFilter
 */

export const REGIONS = ['All', 'Lonavala', 'Karjat', 'Igatpuri', 'Goa', 'Other'];
export const PURPOSES = ['All', 'Investment', 'Personal Use', 'Resale'];
export const SIZE_UNITS = ['Guntha', 'Acre'];
