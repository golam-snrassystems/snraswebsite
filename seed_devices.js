const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

async function runSeeder(){
  try{
    const serviceAccountPath = path.join(__dirname, 'serviceAccount.json');
    if(!fs.existsSync(serviceAccountPath)){
      console.error('serviceAccount.json not found in project root. Aborting.');
      process.exit(1);
    }

    const serviceAccount = require(serviceAccountPath);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app"
    });

    const db = admin.database();

    const seedPath = path.join(__dirname, 'seed_devices_500_505.json');
    if(!fs.existsSync(seedPath)){
      console.error('seed_devices_500_505.json not found in repo root. Aborting.');
      process.exit(1);
    }

    const seedRaw = fs.readFileSync(seedPath, 'utf8');
    const seed = JSON.parse(seedRaw);

    console.log('Seeding database in smaller chunks (devices, keepAlive, data per-device)...');

    if (seed.devices) {
      await db.ref('devices').update(seed.devices);
      console.log('devices written');
    }

    if (seed.keepAlive) {
      await db.ref('keepAlive').update(seed.keepAlive);
      console.log('keepAlive written');
    }

    if (seed.data) {
      // write empty data objects per device to avoid a single huge request
      const deviceIds = Object.keys(seed.data);
      for (const id of deviceIds) {
        await db.ref(`data/${id}`).set(seed.data[id] || {});
        console.log(`data/${id} written`);
      }
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err){
    console.error('Seeder error:', err);
    process.exit(1);
  }
}

runSeeder();
