// api/travel/posts.js
import { getCollection } from '../utils/mongodb.js';
import { requireAuth } from '../utils/auth.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const posts = await getCollection('travel_posts');

  // GET - Fetch all published posts (public)
  if (req.method === 'GET') {
    try {
      const { lang = 'en', slug } = req.query;

      if (slug) {
        // Get single post by slug
        const post = await posts.findOne({ slug, published: true });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json(post);
      }

      // Get all published posts
      const allPosts = await posts.find({ published: true })
        .sort({ date: -1 })
        .toArray();

      return res.status(200).json(allPosts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // POST - Create new post (requires authentication)
  if (req.method === 'POST') {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return res.status(401).json({ error: auth.error });
    }

    try {
      const postData = {
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: auth.user.email
      };

      const result = await posts.insertOne(postData);
      return res.status(201).json({ 
        success: true, 
        id: result.insertedId,
        message: 'Post created successfully'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // PUT - Update post (requires authentication)
  if (req.method === 'PUT') {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return res.status(401).json({ error: auth.error });
    }

    try {
      const { id, ...updateData } = req.body;
      
      const result = await posts.updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ 
        success: true,
        message: 'Post updated successfully'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE - Delete post (requires authentication)
  if (req.method === 'DELETE') {
    const auth = await requireAuth(req);
    if (!auth.authorized) {
      return res.status(401).json({ error: auth.error });
    }

    try {
      const { id } = req.query;
      
      const result = await posts.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ 
        success: true,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
