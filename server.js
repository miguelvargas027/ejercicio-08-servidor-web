const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    try {
        let filePath = '';
        
        // Manejo de rutas
        if (req.url === '/' || req.url === '/index') {
            filePath = path.join(__dirname, 'public', 'index.html');
        } else if (req.url === '/about') {
            filePath = path.join(__dirname, 'public', 'about.html');
        } else if (req.url === '/contact') {
            filePath = path.join(__dirname, 'public', 'contact.html');
        } else {
            // Ruta no encontrada - Error 404
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end('<h1>Error 404 - Ruta no encontrada</h1>');
        }

        // Leer y servir el archivo
        const data = await fs.promises.readFile(filePath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
        
    } catch (error) {
        console.error('Error:', error);
        // Error interno del servidor - Error 500
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Error 500 - Error interno del servidor</h1>');
    }
});


//activamos el servidor
// y lo escuchamos en el puerto 3000
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});