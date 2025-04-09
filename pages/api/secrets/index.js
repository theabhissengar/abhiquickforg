import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add your MongoDB URI to .env');
}

const dbName = 'quickforget'; // Explicitly specify database name

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let client;
    try {
      // Add options to help with connection issues
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 1
      });
      console.log('Connected to MongoDB');

      const { content, password, expiresIn, maxViews } = req.body;
      console.log('Creating secret with params:', { 
        content: content ? '[REDACTED]' : undefined,
        hasPassword: !!password,
        expiresIn,
        maxViews
      });

      // Calculate expiration date
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + parseInt(expiresIn));

      // Hash password if provided
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const db = client.db(dbName);
      const secrets = db.collection('secrets');

      // Ensure indexes exist
      console.log('Creating indexes...');
      await secrets.createIndex({ id: 1 }, { unique: true });
      await secrets.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

      const secretId = uuidv4();
      const secret = {
        id: secretId,
        content,
        password: hashedPassword,
        expiresAt,
        maxViews: parseInt(maxViews),
        views: 0,
        createdAt: new Date()
      };

      console.log('Inserting secret with id:', secretId);
      const insertResult = await secrets.insertOne(secret);
      console.log('Insert result:', insertResult);

      console.log('Secret created successfully');
      res.status(201).json({
        id: secretId,
        expiresAt: secret.expiresAt,
        content: secret.content
      });
    } catch (error) {
      console.error('Detailed error in /api/secrets:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        name: error.name
      });
      res.status(500).json({ error: 'Failed to create secret. Error: ' + error.message });
    } finally {
      if (client) {
        try {
          console.log('Closing MongoDB connection');
          await client.close();
        } catch (closeError) {
          console.error('Error closing MongoDB connection:', closeError);
        }
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 