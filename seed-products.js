const mongoose = require('mongoose');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://soiladmin:soilguard2026@ac-7z1y29o-shard-00-00.4p7qzls.mongodb.net:27017,ac-7z1y29o-shard-00-01.4p7qzls.mongodb.net:27017,ac-7z1y29o-shard-00-02.4p7qzls.mongodb.net:27017/soilguard?ssl=true&replicaSet=atlas-2y4q1k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  stock: { type: Number, default: 100 },
  category: { type: String, default: 'Fertilizer' },
}, { timestamps: true });

// Avoid re-compiling schema if it exists
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
    { name: "Azotobacter Culture", weight: "100", price: 179, img: "/products/azotobacter.png" },
    { name: "Phosphate Solubilizing Bacteria", weight: "10", price: 169, img: "/products/phosphate.png" },
    { name: "Liquid Compost", weight: "130", price: 39, img: "/products/liquid_compost.png" },
    { name: "Vermiculite Mix", weight: "150", price: 149, img: "/products/vermiculite.png" },
    { name: "Organic Potting Mix", weight: "250", price: 60, img: "/products/potting_mix.png" },
    { name: "Fertiliser", weight: "100", price: 49, img: "/products/fertilizer.png" },
    { name: "Vermi compost", weight: "250 g", price: 30, img: "https://images.unsplash.com/photo-1599839619722-39751411ea53?q=80&w=400&auto=format&fit=crop" }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    await Product.deleteMany({});
    console.log("Cleared existing mock products.");

    await Product.insertMany(products);
    console.log("Successfully seeded", products.length, "native DB products into Atlas!");

    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
