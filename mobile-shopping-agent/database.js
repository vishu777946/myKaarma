// Mock database of mobile phones
const mobilePhones = [
    {
        id: 1,
        name: "Samsung Galaxy S23",
        brand: "Samsung",
        price: 74999,
        camera: {
            main: "50MP",
            ultrawide: "12MP",
            telephoto: "10MP",
            front: "12MP",
            features: ["OIS", "8K video", "Night mode"]
        },
        display: {
            size: 6.1,
            type: "Dynamic AMOLED 2X",
            resolution: "1080 x 2340",
            refreshRate: 120
        },
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 3900,
            fastCharging: "25W"
        },
        os: "Android 13",
        dimensions: {
            height: 146.3,
            width: 70.9,
            thickness: 7.6
        },
        weight: 168,
        waterResistant: true,
        colors: ["Phantom Black", "Cream", "Green", "Lavender"],
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzgcins/gallery/in-galaxy-s23-s911-sm-s911bzgcins-534863401"
    },
    {
        id: 2,
        name: "iPhone 15",
        brand: "Apple",
        price: 79900,
        camera: {
            main: "48MP",
            ultrawide: "12MP",
            front: "12MP",
            features: ["Photonic Engine", "4K video", "Night mode"]
        },
        display: {
            size: 6.1,
            type: "Super Retina XDR OLED",
            resolution: "1179 x 2556",
            refreshRate: 60
        },
        processor: "A16 Bionic",
        ram: "6GB",
        storage: "128GB",
        battery: {
            capacity: 3349,
            fastCharging: "20W"
        },
        os: "iOS 17",
        dimensions: {
            height: 147.6,
            width: 71.6,
            thickness: 7.8
        },
        weight: 171,
        waterResistant: true,
        colors: ["Black", "Blue", "Green", "Pink", "Yellow"],
        image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692991097674"
    },
    {
        id: 3,
        name: "Google Pixel 8a",
        brand: "Google",
        price: 29999,
        camera: {
            main: "64MP",
            ultrawide: "13MP",
            front: "13MP",
            features: ["Night Sight", "Super Res Zoom", "Real Tone"]
        },
        display: {
            size: 6.1,
            type: "OLED",
            resolution: "1080 x 2400",
            refreshRate: 90
        },
        processor: "Google Tensor G3",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 4500,
            fastCharging: "18W"
        },
        os: "Android 14",
        dimensions: {
            height: 152.0,
            width: 72.9,
            thickness: 8.9
        },
        weight: 178,
        waterResistant: true,
        colors: ["Obsidian", "Porcelain", "Bay"],
        image: "https://lh3.googleusercontent.com/9_fBNPXJ6Yt-I_Qw4DJHVUjLJQzOy0OGK2X6eDEfujKYYJcr1NrFx9CnuoQpl4C-Aw6XVpQTdXzQnIGKcwvTUQ0UGqGOGBA1Yw=rw-e365-w1440"
    },
    {
        id: 4,
        name: "OnePlus 12R",
        brand: "OnePlus",
        price: 39999,
        camera: {
            main: "50MP",
            ultrawide: "8MP",
            macro: "2MP",
            front: "16MP",
            features: ["OIS", "4K video", "Nightscape"]
        },
        display: {
            size: 6.7,
            type: "Fluid AMOLED",
            resolution: "1080 x 2412",
            refreshRate: 120
        },
        processor: "Snapdragon 8 Gen 2",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 5500,
            fastCharging: "100W"
        },
        os: "OxygenOS 14 (Android 14)",
        dimensions: {
            height: 163.3,
            width: 75.3,
            thickness: 8.8
        },
        weight: 207,
        waterResistant: true,
        colors: ["Cool Blue", "Iron Gray"],
        image: "https://image01.oneplus.net/ebp/202401/16/1-m00-51-00-cpgm7wwhxeaacxvfaajcwgzgmdc126.png"
    },
    {
        id: 5,
        name: "Xiaomi Redmi Note 13 Pro",
        brand: "Xiaomi",
        price: 24999,
        camera: {
            main: "200MP",
            ultrawide: "8MP",
            macro: "2MP",
            front: "16MP",
            features: ["OIS", "4K video", "Night mode"]
        },
        display: {
            size: 6.67,
            type: "AMOLED",
            resolution: "1080 x 2400",
            refreshRate: 120
        },
        processor: "Snapdragon 7s Gen 2",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 5000,
            fastCharging: "67W"
        },
        os: "MIUI 14 (Android 13)",
        dimensions: {
            height: 161.2,
            width: 74.2,
            thickness: 8.0
        },
        weight: 187,
        waterResistant: true,
        colors: ["Midnight Black", "Ocean Blue", "Aurora Green"],
        image: "https://i02.appmifile.com/615_operator_sg/10/01/2024/6e1d1e1f1a36e56d1c2d9e4a9f3fa4f3.png"
    },
    {
        id: 6,
        name: "Motorola Edge 40",
        brand: "Motorola",
        price: 26999,
        camera: {
            main: "50MP",
            ultrawide: "13MP",
            front: "32MP",
            features: ["OIS", "4K video", "Night Vision"]
        },
        display: {
            size: 6.55,
            type: "P-OLED",
            resolution: "1080 x 2400",
            refreshRate: 144
        },
        processor: "Dimensity 8020",
        ram: "8GB",
        storage: "256GB",
        battery: {
            capacity: 4400,
            fastCharging: "68W"
        },
        os: "Android 13",
        dimensions: {
            height: 158.4,
            width: 72.0,
            thickness: 7.6
        },
        weight: 172,
        waterResistant: true,
        colors: ["Eclipse Black", "Nebula Green", "Lunar Blue"],
        image: "https://motorolain.vtexassets.com/arquivos/ids/157229-800-auto"
    },
    {
        id: 7,
        name: "Realme GT 5 Pro",
        brand: "Realme",
        price: 34999,
        camera: {
            main: "50MP",
            ultrawide: "8MP",
            telephoto: "50MP",
            front: "32MP",
            features: ["OIS", "8K video", "Street Mode"]
        },
        display: {
            size: 6.78,
            type: "AMOLED",
            resolution: "1264 x 2780",
            refreshRate: 144
        },
        processor: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "256GB",
        battery: {
            capacity: 5400,
            fastCharging: "100W"
        },
        os: "Realme UI 5.0 (Android 14)",
        dimensions: {
            height: 162.9,
            width: 75.8,
            thickness: 8.5
        },
        weight: 199,
        waterResistant: true,
        colors: ["Bright Black", "Red Rock"],
        image: "https://image01.realme.net/general/20231130/1701328527593.png"
    },
    {
        id: 8,
        name: "Vivo V30",
        brand: "Vivo",
        price: 29999,
        camera: {
            main: "50MP",
            ultrawide: "8MP",
            front: "50MP",
            features: ["OIS", "4K video", "Aura Light"]
        },
        display: {
            size: 6.78,
            type: "AMOLED",
            resolution: "1260 x 2800",
            refreshRate: 120
        },
        processor: "Snapdragon 7 Gen 3",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 5000,
            fastCharging: "80W"
        },
        os: "Funtouch OS 14 (Android 14)",
        dimensions: {
            height: 164.2,
            width: 74.4,
            thickness: 7.5
        },
        weight: 186,
        waterResistant: true,
        colors: ["Peacock Green", "Noble Black", "Andaman Blue"],
        image: "https://www.vivo.com/in/products/v30/images/param-img-1.png"
    },
    {
        id: 9,
        name: "Nothing Phone (2)",
        brand: "Nothing",
        price: 39999,
        camera: {
            main: "50MP",
            ultrawide: "50MP",
            front: "32MP",
            features: ["OIS", "4K video", "Night Mode"]
        },
        display: {
            size: 6.7,
            type: "LTPO OLED",
            resolution: "1080 x 2412",
            refreshRate: 120
        },
        processor: "Snapdragon 8+ Gen 1",
        ram: "12GB",
        storage: "256GB",
        battery: {
            capacity: 4700,
            fastCharging: "45W"
        },
        os: "Nothing OS 2.5 (Android 14)",
        dimensions: {
            height: 162.1,
            width: 76.4,
            thickness: 8.6
        },
        weight: 201,
        waterResistant: true,
        colors: ["White", "Dark Grey"],
        image: "https://in.nothing.tech/cdn/shop/files/Phone-2-Grey-PDP-1_1500x.png"
    },
    {
        id: 10,
        name: "Samsung Galaxy A54",
        brand: "Samsung",
        price: 24999,
        camera: {
            main: "50MP",
            ultrawide: "12MP",
            macro: "5MP",
            front: "32MP",
            features: ["OIS", "4K video", "Night mode"]
        },
        display: {
            size: 6.4,
            type: "Super AMOLED",
            resolution: "1080 x 2340",
            refreshRate: 120
        },
        processor: "Exynos 1380",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 5000,
            fastCharging: "25W"
        },
        os: "Android 13",
        dimensions: {
            height: 158.2,
            width: 76.7,
            thickness: 8.2
        },
        weight: 202,
        waterResistant: true,
        colors: ["Awesome Graphite", "Awesome Violet", "Awesome Lime"],
        image: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a546elvcins/gallery/in-galaxy-a54-5g-sm-a546-sm-a546elvcins-535688992"
    },
    {
        id: 11,
        name: "Poco F5",
        brand: "Poco",
        price: 19999,
        camera: {
            main: "64MP",
            ultrawide: "8MP",
            macro: "2MP",
            front: "16MP",
            features: ["4K video", "Night mode"]
        },
        display: {
            size: 6.67,
            type: "Flow AMOLED",
            resolution: "1080 x 2400",
            refreshRate: 120
        },
        processor: "Snapdragon 7+ Gen 2",
        ram: "8GB",
        storage: "256GB",
        battery: {
            capacity: 5000,
            fastCharging: "67W"
        },
        os: "MIUI 14 (Android 13)",
        dimensions: {
            height: 161.1,
            width: 75.0,
            thickness: 7.9
        },
        weight: 181,
        waterResistant: false,
        colors: ["Carbon Black", "Snowstorm White", "Electric Blue"],
        image: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1683195159.35447032.png"
    },
    {
        id: 12,
        name: "iQOO Z7 Pro",
        brand: "iQOO",
        price: 14999,
        camera: {
            main: "64MP",
            depth: "2MP",
            front: "16MP",
            features: ["Super Night Mode", "4K video"]
        },
        display: {
            size: 6.78,
            type: "AMOLED",
            resolution: "1080 x 2400",
            refreshRate: 120
        },
        processor: "Dimensity 7200",
        ram: "8GB",
        storage: "128GB",
        battery: {
            capacity: 4600,
            fastCharging: "66W"
        },
        os: "Funtouch OS 13 (Android 13)",
        dimensions: {
            height: 164.0,
            width: 74.8,
            thickness: 7.4
        },
        weight: 175,
        waterResistant: false,
        colors: ["Blue Lagoon", "Graphite Matte"],
        image: "https://www.iqoo.com/content/dam/iqoo/in/product/z7-pro/specs/specs-design-blue.png"
    }
];

// Function to get all phones
function getAllPhones() {
    return mobilePhones;
}

// Function to get phone by ID
function getPhoneById(id) {
    return mobilePhones.find(phone => phone.id === id);
}

// Function to filter phones by criteria
function filterPhones(criteria) {
    let filteredPhones = [...mobilePhones];
    
    // Filter by brand
    if (criteria.brand) {
        const brands = Array.isArray(criteria.brand) ? criteria.brand : [criteria.brand];
        filteredPhones = filteredPhones.filter(phone => 
            brands.some(brand => phone.brand.toLowerCase().includes(brand.toLowerCase()))
        );
    }
    
    // Filter by price range
    if (criteria.minPrice !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.price >= criteria.minPrice);
    }
    
    if (criteria.maxPrice !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.price <= criteria.maxPrice);
    }
    
    // Filter by camera quality
    if (criteria.camera) {
        filteredPhones = filteredPhones.filter(phone => {
            const mainCamera = parseInt(phone.camera.main);
            return mainCamera >= criteria.camera;
        });
    }
    
    // Filter by display size
    if (criteria.minDisplaySize !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.display.size >= criteria.minDisplaySize);
    }
    
    if (criteria.maxDisplaySize !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.display.size <= criteria.maxDisplaySize);
    }
    
    // Filter by refresh rate
    if (criteria.minRefreshRate !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.display.refreshRate >= criteria.minRefreshRate);
    }
    
    // Filter by battery capacity
    if (criteria.minBattery !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.battery.capacity >= criteria.minBattery);
    }
    
    // Filter by fast charging
    if (criteria.minFastCharging !== undefined) {
        filteredPhones = filteredPhones.filter(phone => {
            const fastChargingWatts = parseInt(phone.battery.fastCharging);
            return fastChargingWatts >= criteria.minFastCharging;
        });
    }
    
    // Filter by RAM
    if (criteria.minRam !== undefined) {
        filteredPhones = filteredPhones.filter(phone => {
            const ram = parseInt(phone.ram);
            return ram >= criteria.minRam;
        });
    }
    
    // Filter by storage
    if (criteria.minStorage !== undefined) {
        filteredPhones = filteredPhones.filter(phone => {
            const storage = parseInt(phone.storage);
            return storage >= criteria.minStorage;
        });
    }
    
    // Filter by water resistance
    if (criteria.waterResistant !== undefined) {
        filteredPhones = filteredPhones.filter(phone => phone.waterResistant === criteria.waterResistant);
    }
    
    return filteredPhones;
}

// Function to compare phones
function comparePhones(phoneIds) {
    return phoneIds.map(id => getPhoneById(parseInt(id))).filter(phone => phone !== undefined);
}

// Export functions
window.phoneDatabase = {
    getAllPhones,
    getPhoneById,
    filterPhones,
    comparePhones
};