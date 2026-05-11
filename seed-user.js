const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb://soiladmin:soilguard2026@ac-7z1y29o-shard-00-00.4p7qzls.mongodb.net:27017,ac-7z1y29o-shard-00-01.4p7qzls.mongodb.net:27017,ac-7z1y29o-shard-00-02.4p7qzls.mongodb.net:27017/soilguard?ssl=true&replicaSet=atlas-2y4q1k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  role: { type: String, default: 'Customer' },
  authProvider: { type: String, default: 'local' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");

    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await User.findOneAndUpdate(
      { email: "admin@soilguard.com" },
      {
        name: "Admin User",
        email: "admin@soilguard.com",
        password: hashedPassword,
        role: "Admin",
        authProvider: "local"
      },
      { upsert: true, new: true }
    );

    console.log("Successfully seeded admin user: admin@soilguard.com / admin123");
    mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUser();
