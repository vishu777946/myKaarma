const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Phone database functions using Supabase
const phoneDatabase = {
  async getAllPhones() {
    const { data } = await supabase.from('phones').select('*');
    return data || [];
  },

  async getPhoneById(id) {
    const { data } = await supabase.from('phones').select('*').eq('id', id).single();
    return data;
  },

  async filterPhones(criteria = {}) {
    let query = supabase.from('phones').select('*');
    if (criteria.brand) query = query.ilike('brand', `%${criteria.brand}%`);
    if (criteria.maxPrice) query = query.lte('price', criteria.maxPrice);
    const { data } = await query;
    return data || [];
  },

  async comparePhones(phoneId1, phoneId2) {
    const phone1 = await this.getPhoneById(phoneId1);
    const phone2 = await this.getPhoneById(phoneId2);
    if (!phone1 || !phone2) return null;
    return { phone1, phone2 };
  },

  async initializeDatabase() {
    const samplePhones = [
      {
        id: 1,
        brand: "Apple",
        model: "iPhone 15 Pro",
        price: 119900,
        camera: { main: "48MP" },
        display: { type: "OLED", refreshRate: 120 },
        processor: "A17 Pro",
        ram: "8GB",
        storage: "256GB",
        battery: "3200mAh",
        imageUrl: "https://placehold.co/300x300?text=iPhone+15+Pro"
      },
      {
        id: 2,
        brand: "Samsung",
        model: "Galaxy S23 Ultra",
        price: 124999,
        camera: { main: "200MP" },
        display: { type: "AMOLED", refreshRate: 120 },
        processor: "Snapdragon 8 Gen 2",
        ram: "12GB",
        storage: "256GB",
        battery: "5000mAh",
        imageUrl: "https://placehold.co/300x300?text=Galaxy+S23+Ultra"
      }
    ];

    const { count } = await supabase.from('phones').select('*', { count: 'exact', head: true });
    if (count === 0) {
      await supabase.from('phones').insert(samplePhones);
    }
  }
};

module.exports = phoneDatabase;