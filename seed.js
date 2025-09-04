const { sequelize, User, Store, Rating } = require("./src/models");

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const admin = await User.create({
      name: "Admin One",
      email: "admin@rox.com",
      password: "Admin@123",
      role: "ADMIN"
    });

    const owner = await User.create({
      name: "Store Owner",
      email: "owner@rox.com",
      password: "Owner@123",
      role: "OWNER"
    });

    const user = await User.create({
      name: "Normal User",
      email: "user@rox.com",
      password: "User@123",
      role: "USER"
    });

    const store = await Store.create({
      name: "Blue Mart",
      address: "12 MG Road, BLR",
      ownerId: owner.id
    });

    await Rating.create({
      score: 5,
      userId: user.id,
      storeId: store.id
    });

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding DB:", error);
    process.exit(1);
  }
}

seed();
