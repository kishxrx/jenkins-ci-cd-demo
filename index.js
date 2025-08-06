// server.js
const http = require('http');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Jenkins CI/CD Horizontal Demo</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
<style>
    body {
        margin: 0;
        font-family: 'Playfair Display', serif;
        overflow-x: hidden;
        background-color: #000;
        color: #fff;
    }
    .scroll-container {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        height: 100vh;
    }
    .section {
        min-width: 100vw;
        height: 100vh;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        scroll-snap-align: start;
        text-align: center;
        flex-direction: column;
        padding: 20px;
    }
    h1 {
        font-size: 3rem;
        margin-bottom: 0.5rem;
    }
    p {
        font-size: 1.2rem;
        opacity: 0.8;
        max-width: 400px;
        margin-bottom: 2rem;
    }
    .lottie-container {
        width: 300px;
        height: 300px;
    }
    /* Hide scrollbar for clean look */
    .scroll-container::-webkit-scrollbar {
        display: none;
    }
</style>
</head>
<body>
<div class="scroll-container">
    <div class="section">
        <h1>Welcome to the Jenkins CI/CD Demo</h1>
        <p>Continuous Integration, Continuous Delivery, Simplified.</p>
        <div id="lottie1" class="lottie-container"></div>
    </div>
    <div class="section">
        <p>Every commit triggers a reliable build</p>
        <div id="lottie2" class="lottie-container"></div>
    </div>
    <div class="section">
        <p>Deploy with confidence</p>
        <div id="lottie3" class="lottie-container"></div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.1/lottie.min.js"></script>
<script>
    // Load Lottie animations
    lottie.loadAnimation({
        container: document.getElementById('lottie1'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_OtKbHZSvau.json'
    });
    lottie.loadAnimation({
        container: document.getElementById('lottie2'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets10.lottiefiles.com/packages/lf20_lwtk1iUa6L.json'
    });
    lottie.loadAnimation({
        container: document.getElementById('lottie3'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets3.lottiefiles.com/packages/lf20_A742tF.json' // Corrected URL
    });
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
