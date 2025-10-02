// Mobile phone database with mock data
const phoneDatabase = {
  phones: [
    {
      id: 1,
      brand: "Apple",
      model: "iPhone 15 Pro",
      price: 119900,
      camera: {
        main: "48MP",
        ultrawide: "12MP",
        telephoto: "12MP",
        features: ["OIS", "4K video", "Night mode"]
      },
      display: {
        type: "OLED",
        size: "6.1 inches",
        refreshRate: 120,
        resolution: "2556 x 1179"
      },
      processor: "A17 Pro",
      ram: "8GB",
      storage: "256GB",
      battery: "3200mAh",
      os: "iOS 17",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=iPhone+15+Pro"
    },
    {
      id: 2,
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      price: 124999,
      camera: {
        main: "200MP",
        ultrawide: "12MP",
        telephoto: "10MP",
        features: ["OIS", "8K video", "Night mode", "100x Space Zoom"]
      },
      display: {
        type: "AMOLED",
        size: "6.8 inches",
        refreshRate: 120,
        resolution: "3088 x 1440"
      },
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      battery: "5000mAh",
      os: "Android 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Galaxy+S23+Ultra"
    },
    {
      id: 3,
      brand: "Google",
      model: "Pixel 7 Pro",
      price: 84999,
      camera: {
        main: "50MP",
        ultrawide: "12MP",
        telephoto: "48MP",
        features: ["OIS", "4K video", "Night Sight", "Super Res Zoom"]
      },
      display: {
        type: "OLED",
        size: "6.7 inches",
        refreshRate: 120,
        resolution: "3120 x 1440"
      },
      processor: "Google Tensor G2",
      ram: "12GB",
      storage: "128GB",
      battery: "5000mAh",
      os: "Android 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Pixel+7+Pro"
    },
    {
      id: 4,
      brand: "OnePlus",
      model: "11",
      price: 61999,
      camera: {
        main: "50MP",
        ultrawide: "48MP",
        telephoto: "32MP",
        features: ["OIS", "8K video", "Hasselblad tuning"]
      },
      display: {
        type: "AMOLED",
        size: "6.7 inches",
        refreshRate: 120,
        resolution: "3216 x 1440"
      },
      processor: "Snapdragon 8 Gen 2",
      ram: "16GB",
      storage: "256GB",
      battery: "5000mAh",
      os: "OxygenOS 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=OnePlus+11"
    },
    {
      id: 5,
      brand: "Xiaomi",
      model: "13 Pro",
      price: 79999,
      camera: {
        main: "50MP",
        ultrawide: "50MP",
        telephoto: "50MP",
        features: ["OIS", "8K video", "Leica optics"]
      },
      display: {
        type: "OLED",
        size: "6.73 inches",
        refreshRate: 120,
        resolution: "3200 x 1440"
      },
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      battery: "4820mAh",
      os: "MIUI 14",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Xiaomi+13+Pro"
    },
    {
      id: 6,
      brand: "Nothing",
      model: "Phone 2",
      price: 44999,
      camera: {
        main: "50MP",
        ultrawide: "50MP",
        features: ["OIS", "4K video"]
      },
      display: {
        type: "OLED",
        size: "6.7 inches",
        refreshRate: 120,
        resolution: "2412 x 1080"
      },
      processor: "Snapdragon 8+ Gen 1",
      ram: "12GB",
      storage: "256GB",
      battery: "4700mAh",
      os: "Nothing OS 2.0",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Nothing+Phone+2"
    },
    {
      id: 7,
      brand: "Motorola",
      model: "Edge 40 Pro",
      price: 54999,
      camera: {
        main: "50MP",
        ultrawide: "50MP",
        telephoto: "12MP",
        features: ["OIS", "8K video"]
      },
      display: {
        type: "OLED",
        size: "6.7 inches",
        refreshRate: 165,
        resolution: "2400 x 1080"
      },
      processor: "Snapdragon 8 Gen 2",
      ram: "12GB",
      storage: "256GB",
      battery: "4600mAh",
      os: "Android 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Motorola+Edge+40+Pro"
    },
    {
      id: 8,
      brand: "Realme",
      model: "GT 5 Pro",
      price: 59999,
      camera: {
        main: "50MP",
        ultrawide: "8MP",
        telephoto: "50MP",
        features: ["OIS", "4K video"]
      },
      display: {
        type: "AMOLED",
        size: "6.78 inches",
        refreshRate: 144,
        resolution: "2780 x 1264"
      },
      processor: "Snapdragon 8 Gen 3",
      ram: "16GB",
      storage: "256GB",
      battery: "5400mAh",
      os: "Realme UI 5.0",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Realme+GT+5+Pro"
    },
    {
      id: 9,
      brand: "Vivo",
      model: "X90 Pro",
      price: 84999,
      camera: {
        main: "50MP",
        ultrawide: "12MP",
        telephoto: "50MP",
        features: ["OIS", "4K video", "ZEISS optics"]
      },
      display: {
        type: "AMOLED",
        size: "6.78 inches",
        refreshRate: 120,
        resolution: "2800 x 1260"
      },
      processor: "Dimensity 9200",
      ram: "12GB",
      storage: "256GB",
      battery: "4870mAh",
      os: "Funtouch OS 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=Vivo+X90+Pro"
    },
    {
      id: 10,
      brand: "iQOO",
      model: "11",
      price: 59999,
      camera: {
        main: "50MP",
        ultrawide: "8MP",
        telephoto: "13MP",
        features: ["OIS", "4K video"]
      },
      display: {
        type: "AMOLED",
        size: "6.78 inches",
        refreshRate: 144,
        resolution: "3200 x 1440"
      },
      processor: "Snapdragon 8 Gen 2",
      ram: "16GB",
      storage: "256GB",
      battery: "5000mAh",
      os: "Funtouch OS 13",
      waterResistant: true,
      imageUrl: "https://placehold.co/300x300?text=iQOO+11"
    }
  ],

  // Get all phones
  getAllPhones() {
    return this.phones;
  },

  // Get phone by ID
  getPhoneById(id) {
    return this.phones.find(phone => phone.id === id);
  },

  // Filter phones based on criteria
  filterPhones(criteria = {}) {
    return this.phones.filter(phone => {
      // Filter by brand
      if (criteria.brand && !phone.brand.toLowerCase().includes(criteria.brand.toLowerCase())) {
        return false;
      }

      // Filter by max price
      if (criteria.maxPrice && phone.price > criteria.maxPrice) {
        return false;
      }

      // Filter by camera quality
      if (criteria.camera) {
        const mainCamera = parseInt(phone.camera.main);
        if (mainCamera < 48) { // Assuming 48MP is the threshold for "good camera"
          return false;
        }
      }

      // Filter by battery capacity
      if (criteria.battery) {
        const batteryCapacity = parseInt(phone.battery);
        if (batteryCapacity < 4500) { // Assuming 4500mAh is the threshold for "good battery"
          return false;
        }
      }

      // Filter by display quality
      if (criteria.display) {
        if (phone.display.refreshRate < 120 || !phone.display.type.includes("AMOLED")) {
          return false;
        }
      }

      // Filter by performance
      if (criteria.performance) {
        const highPerformanceProcessors = ["Snapdragon 8", "A17", "A16", "Dimensity 9", "Google Tensor"];
        const hasHighPerformance = highPerformanceProcessors.some(proc => phone.processor.includes(proc));
        if (!hasHighPerformance || phone.ram < "8GB") {
          return false;
        }
      }

      // Filter by storage
      if (criteria.storage) {
        const storageSize = parseInt(phone.storage);
        if (storageSize < 128) { // Assuming 128GB is the threshold for "good storage"
          return false;
        }
      }

      return true;
    });
  },

  // Compare two phones
  comparePhones(phoneId1, phoneId2) {
    const phone1 = this.getPhoneById(phoneId1);
    const phone2 = this.getPhoneById(phoneId2);
    
    if (!phone1 || !phone2) {
      return null;
    }
    
    return {
      phone1,
      phone2,
      comparison: {
        price: {
          winner: phone1.price < phone2.price ? phone1.id : phone2.id,
          difference: Math.abs(phone1.price - phone2.price)
        },
        camera: {
          winner: parseInt(phone1.camera.main) > parseInt(phone2.camera.main) ? phone1.id : phone2.id,
          phone1Features: phone1.camera.features,
          phone2Features: phone2.camera.features
        },
        display: {
          winner: phone1.display.refreshRate > phone2.display.refreshRate ? phone1.id : phone2.id,
          phone1Type: phone1.display.type,
          phone2Type: phone2.display.type
        },
        battery: {
          winner: parseInt(phone1.battery) > parseInt(phone2.battery) ? phone1.id : phone2.id,
          difference: Math.abs(parseInt(phone1.battery) - parseInt(phone2.battery))
        },
        processor: {
          phone1: phone1.processor,
          phone2: phone2.processor
        },
        storage: {
          phone1: phone1.storage,
          phone2: phone2.storage
        }
      }
    };
  }
};

module.exports = phoneDatabase;