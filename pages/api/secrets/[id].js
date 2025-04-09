import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

const dbName = 'quickforget';

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    let client;
    try {
      // Add options to help with connection issues
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Get the ID from the query and ensure it's properly formatted
      const secretId = req.query.id;
      if (!secretId || typeof secretId !== 'string') {
        throw new Error('Invalid secret ID');
      }

      const db = client.db(dbName);
      const secrets = db.collection('secrets');

      // Find the secret
      const secret = await secrets.findOne({ id: secretId });
      
      if (!secret) {
        return res.status(404).json({ error: 'Secret not found' });
      }

      // Check if secret has expired
      const now = new Date();
      if (secret.expiresAt < now) {
        return res.status(410).json({ error: 'Secret has expired' });
      }

      // Check if max views reached
      if (secret.views >= secret.maxViews) {
        return res.status(410).json({ error: 'Secret has reached maximum views' });
      }

      // Handle password protection
      if (secret.password) {
        const providedPassword = req.query.password;
        
        if (!providedPassword) {
          return res.status(401).json({ requiresPassword: true });
        }

        const isValidPassword = await bcrypt.compare(providedPassword, secret.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid password' });
        }
      }

      // Increment view count
      await secrets.updateOne(
        { id: secretId },
        { $inc: { views: 1 } }
      );

      // Return the secret
      return res.status(200).json({
        content: secret.content,
        expiresAt: secret.expiresAt,
        views: secret.views + 1,
        maxViews: secret.maxViews,
      });

    } catch (error) {
      console.error('Error retrieving secret:', error);
      return res.status(500).json({ error: 'Failed to retrieve secret' });
    } finally {
      if (client) {
        await client.close();
      }
    }
  }

  // Handle unsupported methods
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
} 