const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'up79nw',
  e2e: {
    setupNodeEvents(on, config) {
      // Menonaktifkan peringatan mixed content untuk mengizinkan HTTP di halaman HTTPS
      config.chromeWebSecurity = false;

      // Pastikan file JSON hasil tes ada sebelum menghasilkan laporan
      on('after:run', async () => {
        // Anda hanya perlu menggunakan merge dan generate setelah semua tes selesai
        const { merge } = require('mochawesome-merge');
        const { generate } = require('mochawesome-report-generator');

        // Gabungkan file laporan JSON
        const report = await merge(['cypress/results/*.json']);
        
        // Hasilkan laporan HTML dan simpan ke folder yang ditentukan
        await generate(report, {
          reportDir: 'cypress/reports',  // Folder tempat laporan HTML disimpan
          overwrite: true,
        });
      });

      return config;
    },
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: true,
      html: true,
      json: true,
      reportDir: 'cypress/results',  // Tempat untuk laporan JSON sementara
    },
  },
});
