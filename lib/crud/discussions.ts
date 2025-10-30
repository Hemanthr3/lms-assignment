import db from '@/config/db';
import {
  discussions,
  type Discussion,
  type NewDiscussion,
} from '@/config/schema';
import { eq } from 'drizzle-orm';

// Create
export async function createDiscussion(data: NewDiscussion) {
  const [discussion] = await db.insert(discussions).values(data).returning();
  return discussion;
}

// Read All
export async function getAllDiscussions(): Promise<Discussion[]> {
  return await db.select().from(discussions);
}

// Read by ID
export async function getDiscussionById(
  id: number
): Promise<Discussion | undefined> {
  const [discussion] = await db
    .select()
    .from(discussions)
    .where(eq(discussions.id, id));
  return discussion;
}

// Read by Subject
export async function getDiscussionsBySubject(
  subject: string
): Promise<Discussion[]> {
  return await db
    .select()
    .from(discussions)
    .where(eq(discussions.subject, subject));
}

// Update
export async function updateDiscussion(
  id: number,
  data: Partial<NewDiscussion>
) {
  const [discussion] = await db
    .update(discussions)
    .set(data)
    .where(eq(discussions.id, id))
    .returning();
  return discussion;
}

// Delete
export async function deleteDiscussion(id: number) {
  await db.delete(discussions).where(eq(discussions.id, id));
}

// Add Post
export async function addPost(
  discussionId: number,
  author: { name: string; avatar_url?: string },
  content: string
) {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion) throw new Error('Discussion not found');

  const newPost = {
    id: (discussion.posts?.length || 0) + 1,
    author,
    content,
    created_at: new Date().toISOString(),
    likes: 0,
    replies: [],
  };

  const updatedPosts = [...(discussion.posts || []), newPost];

  return await updateDiscussion(discussionId, {
    posts: updatedPosts,
    replies_count: (discussion.replies_count || 0) + 1,
    last_activity_at: new Date(),
  });
}

// Add Reply to Post
export async function addReply(
  discussionId: number,
  postId: number,
  author: { name: string; avatar_url?: string },
  content: string
) {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion || !discussion.posts) throw new Error('Discussion not found');

  const updatedPosts = discussion.posts.map((post) => {
    if (post.id === postId) {
      const newReply = {
        id: post.replies.length + 1,
        author,
        content,
        created_at: new Date().toISOString(),
        likes: 0,
      };
      return {
        ...post,
        replies: [...post.replies, newReply],
      };
    }
    return post;
  });

  return await updateDiscussion(discussionId, {
    posts: updatedPosts,
    replies_count: (discussion.replies_count || 0) + 1,
    last_activity_at: new Date(),
  });
}

// Like Post
export async function likePost(discussionId: number, postId: number) {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion || !discussion.posts) throw new Error('Discussion not found');

  const updatedPosts = discussion.posts.map((post) => {
    if (post.id === postId) {
      return { ...post, likes: post.likes + 1 };
    }
    return post;
  });

  return await updateDiscussion(discussionId, { posts: updatedPosts });
}

// Like Reply
export async function likeReply(
  discussionId: number,
  postId: number,
  replyId: number
) {
  const discussion = await getDiscussionById(discussionId);
  if (!discussion || !discussion.posts) throw new Error('Discussion not found');

  const updatedPosts = discussion.posts.map((post) => {
    if (post.id === postId) {
      return {
        ...post,
        replies: post.replies.map((reply) => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 };
          }
          return reply;
        }),
      };
    }
    return post;
  });

  return await updateDiscussion(discussionId, { posts: updatedPosts });
}
