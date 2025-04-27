// Importamos los módulos necesarios
const http = require('http');
const fs = require('fs');
const path = require('path');

// Definimos el puerto donde escuchará el servidor
const PORT = 3000;

// Creamos el servidor HTTP
const server = http.createServer(async(req, res) => {   
    try {
        // Determinamos que archivo servir según la URL
        let filePath = '';

        if (req.url === '/' || req.url === '/index') {
            filePath = path.join(__dirname, 'public', 'index.html');
        } else if (req.url === '/about') {
            filePath = path.join(__dirname, 'public', 'about.html');
        } else if (req.url === '/contact') {
            filePath = path.join(__dirname, 'public', 'contact.html');
        } else {
            // Si no es una ruta válida, mostramos el error 404
            filePath = path.join(__dirname, 'public', '404.html');
            return serveFile(res, filePath, 404);
        }

        // Servimos el archivo correspondiente
        await serveFile(res, filePath);
        
    } catch (error) {
        console.error('Error:', error);
        // En caso de error interno, mostramos el error 500
        const filePath = path.join(__dirname, 'public', '500.html');
        await serveFile(res, filePath, 500);
    }
});

// Función para servir archivos

async function serveFile(res, filePath, statusCode = 200) {
    try {
        // Leemos el archivo
        const data = await fs.promises.readFile(filePath, 'utf8');
        
        // Configuramos la cabecera de la respuesta
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        
        // Enviamos el contenido del archivo
        res.end(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        // Si hay error al leer el archivo (por ejemplo, no existe), mostramos 500
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Error Interno del Servidor</h1>');
    }
}

// Iniciamos el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
