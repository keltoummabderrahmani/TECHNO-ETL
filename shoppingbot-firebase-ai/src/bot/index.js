
// const TelegramBot = require('node-telegram-bot-api'); // Unused - commented out
// const { telegramToken, adminIds } = require('../config'); // Unused - commented out// const { fetchProducts, fetchProduct, searchProducts, getCategories } = require('../services/magento'); // Unused - commented out// const { getAIReply } = require('../services/gpt'); // Unused - commented out// const { storeUser, getUserStats, logInteraction } = require('../services/firebase'); // Unused - commented out// const bot = new TelegramBot(telegramToken, { polling: true }); // Unused - commented out
// Admin check function// const isAdmin = (userId) => adminIds.includes(String(userId)); // Unused - commented out
console.log('🤖 ShoppingBot started listening for commands.');

// Start command with enhanced welcome
bot.onText(/\/start/, async (msg) => {
  try {
    await storeUser(msg.from);
await logInteraction(msg.from.id, 'start_command');
    console.log(`User ${msg.from.id} started a session.`);// const welcomeMessage = `🛒 Welcome to ShoppingBot!

` +
      `I'm your AI-powered shopping assistant. Here's what I can do:

` +
      `🛍️ /products - Browse our latest products
` +
      `🔍 /search <query> - Search for specific items
` +
      `📂 /categories - View product categories
` +
      `ℹ️ /help - Get detailed help

` +
      `Just type any question and I'll help you find what you need!`; // Unused - commented out
    bot.sendMessage(msg.chat.id, welcomeMessage);
  } catch (error) {
    console.error('Start command error:', error);
    bot.sendMessage(msg.chat.id, 'Welcome to ShoppingBot! 🛒');
  }
});

// Products command with pagination
bot.onText(/\/products(?:\s+(\d+))?/, async (msg, match) => {
  try {// const page = parseInt(match[1]) || 1; // Unused - commented out// const products = await fetchProducts(page); // Unused - commented out
    if (!products || products.length === 0) {
      bot.sendMessage(msg.chat.id, 'No products found. 😞');
      return;
    }

await logInteraction(msg.from.id, 'products_command', { page });
    console.log(`User ${msg.from.id} requested product list, page ${page}.`);// let message = `🛍️ **Product Catalog** (Page ${page})\n\n`; // Unused - commented out
    products.slice(0, 5).forEach((product, index) => {
      message += `${index + 1}. **${product.name}**\n`;
      message += `💰 Price: $${product.price}\n`;
      message += `📦 SKU: ${product.sku}\n`;
      if (product.short_description) {
        message += `📝 ${product.short_description.substring(0, 100)}...\n`;
      }
      message += `\n`;
    });
    
    message += `\nUse /search to find specific items or ask me anything! 💬`;
    
    bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Products command error:', error);
    bot.sendMessage(msg.chat.id, 'Sorry, I had trouble fetching products. Please try again later.');
  }
});

// Search command
bot.onText(/\/search\s+(.+)/, async (msg, match) => {
  try {// const query = match[1]; // Unused - commented out// const products = await searchProducts(query); // Unused - commented out
    await logInteraction(msg.from.id, 'search_command', { query });
    
    if (!products || products.length === 0) {
      bot.sendMessage(msg.chat.id, `No products found for "${query}". Try a different search term! 🔍`);
      return;
    }// let message = `🔍 **Search Results for "${query}"**\n\n`; // Unused - commented out
    products.slice(0, 3).forEach((product, index) => {
      message += `${index + 1}. **${product.name}**\n`;
      message += `💰 $${product.price}\n`;
      message += `📦 SKU: ${product.sku}\n\n`;
    });
    
    bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Search command error:', error);
    bot.sendMessage(msg.chat.id, 'Sorry, search is temporarily unavailable.');
  }
});

// Categories command
bot.onText(/\/categories/, async (msg) => {
  try {// const categories = await getCategories(); // Unused - commented out
    await logInteraction(msg.from.id, 'categories_command');
    
    if (!categories || categories.length === 0) {
      bot.sendMessage(msg.chat.id, 'No categories available.');
      return;
    }// let message = `📂 **Product Categories**\n\n`; // Unused - commented out
    categories.forEach((category, index) => {
      message += `${index + 1}. ${category.name}\n`;
    });
    
    bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Categories command error:', error);
    bot.sendMessage(msg.chat.id, 'Sorry, categories are temporarily unavailable.');
  }
});

// Help command
bot.onText(/\/help/, async (msg) => {// const helpMessage = `🤖 **ShoppingBot Help**\n\n` +
    `**Commands:**\n` +
    `🛍️ /products [page] - Browse products\n` +
    `🔍 /search <query> - Search for items\n` +
    `📂 /categories - View categories\n` +
    `ℹ️ /help - Show this help\n\n` +
    `**AI Chat:**\n` +
    `Just type any message and I'll help you with:\n` +
    `• Product recommendations\n` +
    `• Shopping advice\n` +
    `• Product comparisons\n` +
    `• General questions\n\n` +
    `Happy shopping! 🛒`; // Unused - commented out
  bot.sendMessage(msg.chat.id, helpMessage, { parse_mode: 'Markdown' });
});

// Admin commands
bot.onText(/\/admin\s+(\w+)/, async (msg, match) => {
  if (!isAdmin(msg.from.id)) {
    bot.sendMessage(msg.chat.id, '❌ Access denied. Admin only.');
    return;
  }// const command = match[1].toLowerCase(); // Unused - commented out
  try {
      if (command=='') {
          log(`Admin ${msg.from.id} accessed admin commands.`);// const stats = await getUserStats(); // Unused - commented out
          bot.sendMessage(msg.chat.id, `📊 **Bot Statistics**\n\n` +
              `👥 Total Users: ${stats.totalUsers}\n` +
              `💬 Total Interactions: ${stats.totalInteractions}\n` +
              `📅 Today's Users: ${stats.todayUsers}`,
              {parse_mode: 'Markdown'}
          );
      } else if (command === 'stats') {// const stats = await getUserStats(); // Unused - commented out
          bot.sendMessage(msg.chat.id, `📊 **Bot Statistics**\n\n` +
              `👥 Total Users: ${stats.totalUsers}\n` +
              `💬 Total Interactions: ${stats.totalInteractions}\n` +
              `📅 Today's Users: ${stats.todayUsers}`,
              {parse_mode: 'Markdown'}
          );
      } else if (command === 'broadcast') {
          bot.sendMessage(msg.chat.id, 'Use /broadcast <message> to send to all users.');
      } else {
          bot.sendMessage(msg.chat.id, 'Available admin commands: stats, broadcast');
      }
  } catch (error) {
    console.error('Admin command error:', error);
    bot.sendMessage(msg.chat.id, 'Admin command failed.');
  }
});

// Broadcast command
bot.onText(/\/broadcast\s+(.+)/, async (msg, match) => {
  if (!isAdmin(msg.from.id)) {
    bot.sendMessage(msg.chat.id, '❌ Access denied.');
    return;
  }

  // Implementation would require getting all users from Firebase
  bot.sendMessage(msg.chat.id, '📢 Broadcast feature coming soon!');
});

// AI Chat handler
bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) return;
  if (!msg.text) return;
  
  try {
await logInteraction(msg.from.id, 'ai_chat', { message: msg.text });
    console.log(`User ${msg.from.id} sent an AI chat message: ${msg.text}`);
    
    // Enhanced context for shopping assistant// const context = `You are a helpful shopping assistant for an e-commerce store. ` +
      `Help users find products, make recommendations, compare items, and answer shopping-related questions. ` +
      `Be friendly, helpful, and encourage users to explore our product catalog. ` +
      `If users ask about specific products, suggest they use /search or /products commands.`; // Unused - commented out// const reply = await getAIReply(msg.text, context); // Unused - commented out
    bot.sendMessage(msg.chat.id, reply);
  } catch (error) {
    console.error('AI chat error:', error);
    bot.sendMessage(msg.chat.id, 'Sorry, I had trouble understanding. Please try again! 🤖');
  }
});

// Error handling
bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

console.log('🤖 ShoppingBot is running...');

module.exports = bot;
