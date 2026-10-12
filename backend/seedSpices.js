const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { Category, Product } = require('./models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const categories = [
  { name: 'Cinnamon', slug: 'cinnamon', description: 'World-renowned Ceylon Cinnamon with unique aroma and medicinal properties.' },
  { name: 'Cardamoms', slug: 'cardamoms', description: 'Premium Sri Lankan Green Cardamoms, known as the Queen of Spices.' },
  { name: 'Cloves', slug: 'cloves', description: 'Rich, aromatic cloves hand-picked for quality.' },
  { name: 'Essential Oils', slug: 'essential-oils', description: 'Pure extracts from Ceylon spices for therapeutic and industrial use.' },
  { name: 'Nutmeg & Mace', slug: 'nutmeg-mace', description: 'High-quality nutmeg and mace for culinary excellence.' },
  { name: 'Pepper', slug: 'pepper', description: 'Pungent and bold Ceylon Black and White Pepper.' },
  { name: 'Vanilla', slug: 'vanilla', description: 'Exotic Ceylon Vanilla beans and extracts.' },
  { name: 'Ginger', slug: 'ginger', description: 'Zesty and fresh Sri Lankan ginger.' },
  { name: 'Turmeric', slug: 'turmeric', description: 'Bright and potent turmeric powder and roots.' },
];

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    console.log('Cleared existing data.');

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories Seeded.');

    const cinnamonId = createdCategories.find(c => c.name === 'Cinnamon')._id;
    const pepperId = createdCategories.find(c => c.name === 'Pepper')._id;

    // Seed Products
    const products = [
      {
        name: 'Ceylon Cinnamon Cuts (C5 Special)',
        scientificName: 'Cinnamomum zeylanicum',
        category: cinnamonId,
        grade: 'C5 Special',
        description: 'Premium quality cinnamon quills with thin bark and sweet aroma.',
        quantity: 500,
        unit: 'kg',
        pricePerUnit: 4500,
        availabilityStatus: true,
      },
      {
        name: 'Ceylon Cinnamon Powder',
        scientificName: 'Cinnamomum zeylanicum',
        category: cinnamonId,
        grade: 'Grade 1',
        description: 'Finely ground premium cinnamon powder, ideal for baking and beverages.',
        quantity: 200,
        unit: 'kg',
        pricePerUnit: 3200,
        availabilityStatus: true,
      },
      {
        name: 'Black Pepper G1',
        scientificName: 'Piper nigrum',
        category: pepperId,
        grade: 'Grade 1 (550g/l)',
        description: 'High-density black pepper with bold flavor and high piperine content.',
        quantity: 1000,
        unit: 'kg',
        pricePerUnit: 2800,
        availabilityStatus: true,
      },
    ];

    await Product.insertMany(products);
    console.log('Products Seeded.');

    console.log('Seeding Complete!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
