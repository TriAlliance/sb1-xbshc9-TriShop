import express from 'express';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let api;

const initWooCommerceAPI = () => {
  if (process.env.VITE_WOOCOMMERCE_URL && 
      process.env.VITE_WOOCOMMERCE_CONSUMER_KEY && 
      process.env.VITE_WOOCOMMERCE_CONSUMER_SECRET) {
    api = new WooCommerceRestApi({
      url: process.env.VITE_WOOCOMMERCE_URL,
      consumerKey: process.env.VITE_WOOCOMMERCE_CONSUMER_KEY,
      consumerSecret: process.env.VITE_WOOCOMMERCE_CONSUMER_SECRET,
      version: "wc/v3"
    });
  } else {
    console.warn('WooCommerce API credentials are not set. Some features may not work.');
  }
};

initWooCommerceAPI();

app.get('/api/settings', async (req, res) => {
  try {
    console.log('Received request for settings');
    const settings = {
      woocommerceUrl: process.env.VITE_WOOCOMMERCE_URL || '',
      consumerKey: process.env.VITE_WOOCOMMERCE_CONSUMER_KEY || '',
      consumerSecret: process.env.VITE_WOOCOMMERCE_CONSUMER_SECRET || '',
    };
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'An error occurred while fetching settings' });
  }
});

app.post('/api/settings', async (req, res) => {
  try {
    const { woocommerceUrl, consumerKey, consumerSecret } = req.body;
    
    // Update .env file
    const envContent = `VITE_WOOCOMMERCE_URL=${woocommerceUrl}
VITE_WOOCOMMERCE_CONSUMER_KEY=${consumerKey}
VITE_WOOCOMMERCE_CONSUMER_SECRET=${consumerSecret}`;

    const envPath = path.join(process.cwd(), '.env');
    await fs.writeFile(envPath, envContent);

    // Update process.env
    process.env.VITE_WOOCOMMERCE_URL = woocommerceUrl;
    process.env.VITE_WOOCOMMERCE_CONSUMER_KEY = consumerKey;
    process.env.VITE_WOOCOMMERCE_CONSUMER_SECRET = consumerSecret;

    // Reinitialize WooCommerce API
    initWooCommerceAPI();

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'An error occurred while updating settings' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});