const Discord = require('discord.js');
const os = require('os');

const webhookURL = 'dcwbhooks url';
const webhook = new Discord.WebhookClient({ url: webhookURL });
let messageId = '1216294859359387658'; // ID pesan yang ingin diupdate

// Mengambil informasi sistem
function getSystemStats() {
    const cpuUsage = Math.round(os.loadavg()[0] * 100);
    const totalMemory = Math.round(os.totalmem() / 1024 / 1024 / 1024); // Total memory in GB
    const freeMemory = Math.round(os.freemem() / 1024 / 1024 / 1024); // Free memory in GB
    const totalMemoryGB = `${totalMemory} GB`;
    const ramUsage = Math.round((os.totalmem() - os.freemem()) / os.totalmem() * 100);
    const uptime = os.uptime();
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);

    return { cpuUsage, totalMemoryGB, ramUsage, uptimeHours, uptimeMinutes };
}

// Membuat pesan embed dengan informasi sistem
function createEmbed(stats) {
    const embed = new Discord.MessageEmbed()
        .setTitle('System Stats NODE1 LinucxPanel')
        .setColor('#00ff00')
        .addField('CPU Usage', `${stats.cpuUsage}% / 100%`, true)
        .addField('RAM Usage', `${stats.ramUsage}% / ${stats.totalMemoryGB}`, true)
        .addField('Uptime', `${stats.uptimeHours} hours ${stats.uptimeMinutes} minutes`, true)

    return embed;
}

// Mengedit pesan di Discord menggunakan webhooks
async function editStatsMessage() {
    const stats = getSystemStats();
    const embed = createEmbed(stats);

    await webhook.editMessage(messageId, { embeds: [embed] });
}

// Panggil fungsi untuk mengedit statistik di Discord setiap 30 detik
setInterval(editStatsMessage, 30 * 1000); // 30 detik

// Output ke konsol sebagai tanda bahwa skrip telah berjalan
console.log('Script started and will edit system stats message every 30 seconds.');
