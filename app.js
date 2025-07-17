const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function fetchAndSearchProducts(categoryInput, priceLimit, nameKeyword) {
  try {
    const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
    const products = response.data;

    const filteredProducts = products.filter(product => {
      const categoryMatch = product.category?.name?.toLowerCase().includes(categoryInput.toLowerCase());
      const priceMatch = product.price <= priceLimit;
      const nameMatch = product.name.toLowerCase().includes(nameKeyword.toLowerCase());

      return categoryMatch && priceMatch && nameMatch;
    });

    if (filteredProducts.length === 0) {
      console.log("\n❌ Koi product nahi mila.");
    } else {
      console.log(`\n🎉 ${filteredProducts.length} product(s) mile:`);
      filteredProducts.forEach(product => {
        console.log(`\n🛒 Name: ${product.name}`);
        console.log(`💰 Price: $${product.price}`);
        console.log(`📦 Category: ${product.category?.name}`);
        console.log(`🖼️ Image: ${product.image}`);
      });
    }

    rl.close();

  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
  }
}

// User se 3 inputs lena
rl.question("🛍️ Tum kis category ka product dhundhna chahti ho? (Example: chairs, tables): ", function(categoryInput) {
  rl.question("💵 Maximum price kitna hona chahiye? (Example: 300): ", function(priceInput) {
    rl.question("🔍 Product name mein kya hona chahiye? (Example: wood, chair, lamp): ", function(nameKeyword) {
      fetchAndSearchProducts(categoryInput, parseInt(priceInput), nameKeyword);
    });
  });
});
