# Mobile phone database with mock data
class PhoneDatabase:
    def __init__(self):
        self.phones = [
            {
                "id": 1,
                "brand": "Apple",
                "model": "iPhone 15 Pro",
                "price": 119900,
                "camera": {
                    "main": "48MP",
                    "ultrawide": "12MP",
                    "telephoto": "12MP",
                    "features": ["OIS", "4K video", "Night mode"]
                },
                "display": {
                    "type": "OLED",
                    "size": "6.1 inches",
                    "refreshRate": 120,
                    "resolution": "2556 x 1179"
                },
                "processor": "A17 Pro",
                "ram": "8GB",
                "storage": "256GB",
                "battery": "3200mAh",
                "os": "iOS 17",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=iPhone+15+Pro"
            },
            {
                "id": 7,
                "brand": "Samsung",
                "model": "Galaxy S23 Ultra",
                "price": 124999,
                "camera": {
                    "main": "200MP",
                    "ultrawide": "12MP",
                    "telephoto": "10MP",
                    "features": ["OIS", "8K video", "Night mode", "100x Space Zoom"]
                },
                "display": {
                    "type": "AMOLED",
                    "size": "6.8 inches",
                    "refreshRate": 120,
                    "resolution": "3088 x 1440"
                },
                "processor": "Snapdragon 8 Gen 2",
                "ram": "12GB",
                "storage": "256GB",
                "battery": "5000mAh",
                "os": "Android 13",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=Galaxy+S23+Ultra"
            },
            {
                "id": 2,
                "brand": "Samsung",
                "model": "Galaxy S24 Ultra",
                "price": 124999,
                "camera": {
                    "main": "200MP",
                    "ultrawide": "12MP",
                    "telephoto": "10MP",
                    "features": ["OIS", "8K video", "Night mode", "100x Space Zoom"]
                },
                "display": {
                    "type": "AMOLED",
                    "size": "6.8 inches",
                    "refreshRate": 120,
                    "resolution": "3088 x 1440"
                },
                "processor": "Snapdragon 8 Gen 2",
                "ram": "12GB",
                "storage": "256GB",
                "battery": "5000mAh",
                "os": "Android 13",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=Galaxy+S24+Ultra"
            },
            {
                "id": 3,
                "brand": "Google",
                "model": "Pixel 7 Pro",
                "price": 84999,
                "camera": {
                    "main": "50MP",
                    "ultrawide": "12MP",
                    "telephoto": "48MP",
                    "features": ["OIS", "4K video", "Night Sight", "Super Res Zoom"]
                },
                "display": {
                    "type": "OLED",
                    "size": "6.7 inches",
                    "refreshRate": 120,
                    "resolution": "3120 x 1440"
                },
                "processor": "Google Tensor G2",
                "ram": "12GB",
                "storage": "128GB",
                "battery": "5000mAh",
                "os": "Android 13",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=Pixel+7+Pro"
            },
            {
                "id": 4,
                "brand": "OnePlus",
                "model": "11",
                "price": 61999,
                "camera": {
                    "main": "50MP",
                    "ultrawide": "48MP",
                    "telephoto": "32MP",
                    "features": ["OIS", "8K video", "Hasselblad tuning"]
                },
                "display": {
                    "type": "AMOLED",
                    "size": "6.7 inches",
                    "refreshRate": 120,
                    "resolution": "3216 x 1440"
                },
                "processor": "Snapdragon 8 Gen 2",
                "ram": "16GB",
                "storage": "256GB",
                "battery": "5000mAh",
                "os": "OxygenOS 13",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=OnePlus+11"
            },
            {
                "id": 5,
                "brand": "Xiaomi",
                "model": "13 Pro",
                "price": 79999,
                "camera": {
                    "main": "50MP",
                    "ultrawide": "50MP",
                    "telephoto": "50MP",
                    "features": ["OIS", "8K video", "Leica optics"]
                },
                "display": {
                    "type": "OLED",
                    "size": "6.73 inches",
                    "refreshRate": 120,
                    "resolution": "3200 x 1440"
                },
                "processor": "Snapdragon 8 Gen 2",
                "ram": "12GB",
                "storage": "256GB",
                "battery": "4820mAh",
                "os": "MIUI 14",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=Xiaomi+13+Pro"
            },
            {
                "id": 6,
                "brand": "Nothing",
                "model": "Phone 2",
                "price": 44999,
                "camera": {
                    "main": "50MP",
                    "ultrawide": "50MP",
                    "features": ["OIS", "4K video"]
                },
                "display": {
                    "type": "OLED",
                    "size": "6.7 inches",
                    "refreshRate": 120,
                    "resolution": "2412 x 1080"
                },
                "processor": "Snapdragon 8+ Gen 1",
                "ram": "12GB",
                "storage": "256GB",
                "battery": "4700mAh",
                "os": "Nothing OS 2.0",
                "waterResistant": True,
                "imageUrl": "https://placehold.co/300x300?text=Nothing+Phone+2"
            }
        ]

    def get_all_phones(self):
        """Return all phones in the database"""
        return self.phones

    def get_phone_by_id(self, phone_id):
        """Return a phone by its ID"""
        for phone in self.phones:
            if phone["id"] == phone_id:
                return phone
        return None

    def filter_phones(self, criteria):
        """Filter phones based on criteria"""
        filtered_phones = self.phones.copy()
        
        if "maxPrice" in criteria and criteria["maxPrice"]:
            filtered_phones = [phone for phone in filtered_phones if phone["price"] <= criteria["maxPrice"]]
            
        if "brand" in criteria and criteria["brand"]:
            filtered_phones = [phone for phone in filtered_phones if phone["brand"].lower() == criteria["brand"].lower()]
            
        return filtered_phones

    def compare_phones(self, id1, id2):
        """Compare two phones by their IDs"""
        phone1 = self.get_phone_by_id(id1)
        phone2 = self.get_phone_by_id(id2)
        
        if not phone1 or not phone2:
            return None
            
        return {
            "phone1": phone1,
            "phone2": phone2,
            "comparison": {
                "price": {
                    "winner": "phone1" if phone1["price"] < phone2["price"] else "phone2",
                    "difference": abs(phone1["price"] - phone2["price"])
                },
                "camera": {
                    "winner": "phone1" if int(phone1["camera"]["main"].replace("MP", "")) > int(phone2["camera"]["main"].replace("MP", "")) else "phone2",
                    "mainDifference": abs(int(phone1["camera"]["main"].replace("MP", "")) - int(phone2["camera"]["main"].replace("MP", "")))
                },
                "display": {
                    "winner": "phone1" if phone1["display"]["refreshRate"] > phone2["display"]["refreshRate"] else "phone2",
                    "refreshRateDifference": abs(phone1["display"]["refreshRate"] - phone2["display"]["refreshRate"])
                },
                "battery": {
                    "winner": "phone1" if int(phone1["battery"].replace("mAh", "")) > int(phone2["battery"].replace("mAh", "")) else "phone2",
                    "difference": abs(int(phone1["battery"].replace("mAh", "")) - int(phone2["battery"].replace("mAh", "")))
                }
            }
        }

# Create a singleton instance
phone_database = PhoneDatabase()