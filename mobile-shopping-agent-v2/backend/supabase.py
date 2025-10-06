import os
from dotenv import load_dotenv
from supabase import create_client

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase_url = os.getenv('SUPABASE_URL', 'https://nobtcddkqgaipjrciqxp.supabase.co')
supabase_key = os.getenv('SUPABASE_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vYnRjZGRrcWdhaXBqcmNpcXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDA5NDgsImV4cCI6MjA3NDk3Njk0OH0.E7QbRE8TXhdkfdD2Ar7BTF6jc6Q8JaRwXGGhDAymSsA')
supabase = create_client(supabase_url, supabase_key)

class PhoneDatabase:
    @staticmethod
    async def get_all_phones():
        response = await supabase.table('phones').select('*').execute()
        return response.data or []

    @staticmethod
    async def get_phone_by_id(id):
        response = await supabase.table('phones').select('*').eq('id', id).single().execute()
        return response.data

    @staticmethod
    async def filter_phones(criteria=None):
        if criteria is None:
            criteria = {}
            
        query = supabase.table('phones').select('*')
        if 'brand' in criteria:
            query = query.ilike('brand', f"%{criteria['brand']}%")
        if 'maxPrice' in criteria:
            query = query.lte('price', criteria['maxPrice'])
            
        response = await query.execute()
        return response.data or []

    @classmethod
    async def compare_phones(cls, phone_id1, phone_id2):
        phone1 = await cls.get_phone_by_id(phone_id1)
        phone2 = await cls.get_phone_by_id(phone_id2)
        if not phone1 or not phone2:
            return None
        return {"phone1": phone1, "phone2": phone2}

    @staticmethod
    async def initialize_database():
        sample_phones = [
            {
                "id": 1,
                "brand": "Apple",
                "model": "iPhone 15 Pro",
                "price": 119900,
                "camera": {"main": "48MP"},
                "display": {"type": "OLED", "refreshRate": 120},
                "processor": "A17 Pro",
                "ram": "8GB",
                "storage": "256GB",
                "battery": "3200mAh",
                "imageUrl": "https://placehold.co/300x300?text=iPhone+15+Pro"
            },
            {
                "id": 2,
                "brand": "Samsung",
                "model": "Galaxy S23 Ultra",
                "price": 124999,
                "camera": {"main": "200MP"},
                "display": {"type": "AMOLED", "refreshRate": 120},
                "processor": "Snapdragon 8 Gen 2",
                "ram": "12GB",
                "storage": "256GB",
                "battery": "5000mAh",
                "imageUrl": "https://placehold.co/300x300?text=Galaxy+S23+Ultra"
            }
        ]

        count_response = await supabase.table('phones').select('*', count='exact').limit(1).execute()
        count = count_response.count
        
        if count == 0:
            await supabase.table('phones').insert(sample_phones).execute()

phone_database = PhoneDatabase()