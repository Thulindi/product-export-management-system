const mongoose = require('mongoose');
const User = require('./models/User');
const Client = require('./models/Client');
require('dotenv').config();

async function checkData() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const users = await User.find();
  console.log('Total Users:', users.length);
  
  for (const user of users) {
    const client = await Client.findOne({ userId: user._id });
    console.log(`User: ${user.email} (${user.role}) - Client: ${client ? 'YES' : 'NO'}`);
    if (client) {
       console.log('   Data:', { companyName: client.companyName, phone: client.phone, country: client.country });
    }
  }
  
  process.exit();
}

checkData();
