const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'dist', 'build.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Nivel de compresión
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained');
});

archive.on('warning', function(err) {
  if (err.code !== 'ENOENT') {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Comprimir la carpeta de salida generada por el build
archive.directory(path.join(__dirname, 'dist','chatbot'), false);

archive.finalize();
