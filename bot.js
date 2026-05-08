const TelegramBot = require('node-telegram-bot-api');

// Masukkan token dari BotFather langsung di sini
const token = '8762520274:AAFjcIH33MCWS4cPApGrUDR8wYpieEppkOU'; 

const bot = new TelegramBot(token, {polling: true});

console.log("Bot sedang berjalan... Coba ketik /start di Telegram.");

// --- Definisi Menu Utama ---
const menuUtama = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Keterangan Obat', callback_data: 'keterangan_obat' },
        { text: 'Ketersediaan Obat', callback_data: 'ketersediaan_obat' }
      ],
      [
        { text: 'Riwayat Penyakit Pasien', callback_data: 'riwayat_penyakit_pasien'},
        { text: 'Riwayat Obat Pasien', callback_data: 'riwayat_obat_pasien' }
      ],
      [
        { text: 'Informasi Layanan Apotik', url: 'https://google.com' }
      ]
    ]
  },
  parse_mode: 'Markdown'
};

// 1. Perintah /start untuk memicu menu
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Halo! Klik tombol di bawah ini untuk melihat informasi:", menuUtama);
});

// 2. Logika Interaksi Tombol
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  const tombolKembali = {
    reply_markup: {
      inline_keyboard: [[{ text: '⬅️ Kembali ke Menu Utama', callback_data: 'buka_menu' }]]
    },
    parse_mode: 'Markdown'
  };

  if (data === 'buka_menu') {
    bot.editMessageText("Halo! Klik tombol di bawah ini untuk melihat informasi:", {
      chat_id: chatId,
      message_id: messageId,
      ...menuUtama
    });
  } 
  else if (data === 'keterangan_obat') {
    bot.editMessageText(
      "📋 **KETERANGAN OBAT**\n\n" +
      "1. **Paracetamol**: Pereda nyeri dan penurun demam.\n" +
      "2. **Amoxicillin**: Antibiotik spektrum luas (Harus resep dokter).\n" +
      "3. **Ibuprofen**: Obat anti-inflamasi untuk nyeri.",
      { chat_id: chatId, message_id: messageId, ...tombolKembali }
    );
  } 
  else if (data === 'ketersediaan_obat') {
    bot.editMessageText(
      "📦 **KETERSEDIAAN OBAT**\n\n" +
      "• **Paracetamol**: Tablet 500mg, Sirup.\n" +
      "• **Amoxicillin**: Kapsul 500mg.\n" +
      "• **Ibuprofen**: Tablet 400mg.",
      { chat_id: chatId, message_id: messageId, ...tombolKembali }
    );
  }
  else if (data === 'riwayat_penyakit_pasien') {
    bot.editMessageText(
      "🏥 **RIWAYAT PENYAKIT PASIEN**\n\n" +
      "• **Pasien A**: Demam tinggi 2 hari.\n" +
      "• **Pasien B**: Faringitis & Sinusitis.\n" +
      "• **Pasien C**: Nyeri sendi & Gastritis.",
      { chat_id: chatId, message_id: messageId, ...tombolKembali }
    );
  }
  else if (data === 'riwayat_obat_pasien') {
    bot.editMessageText(
      "💊 **RIWAYAT OBAT PASIEN**\n\n" +
      "• **Pasien A**: Paracetamol 6 bln lalu.\n" +
      "• **Pasien B**: Sefalosporin.\n" +
      "• **Pasien C**: Antasida rutin.",
      { chat_id: chatId, message_id: messageId, ...tombolKembali }
    );
  }

  bot.answerCallbackQuery(callbackQuery.id);
});