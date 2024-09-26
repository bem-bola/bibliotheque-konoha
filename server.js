const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const jutsuScrollRoutes = require('./src/routes/jutsuScrollRoutes');
const ninjaRoutes = require('./src/routes/ninjaRoutes');
const borrowRoutes = require('./src/routes/borrowRoutes');
const seedDatabase = require('./src/utils/migrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const errorHandler = require('./src/middleware/errorHandler');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./src/routes/userRoutes');
const { protect } = require('./src/middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
// Démarrage du serveur
const PORT = process.env.PORT;
const MAX_MINUTE = process.env.MAX_MINUTE || 15;
const MAX_REQUETE_PER_WINDOW = process.env.MAX_REQUETE_PER_WINDOW || 100;


const limiter = rateLimit({
    windowMs: MAX_MINUTE * 60 * 1000, // 15 minutes
    max: MAX_REQUETE_PER_WINDOW // Limite chaque IP à 100 requêtes par fenêtre
});

app.use(limiter);

app.use(errorHandler);
app.use(express.json()); // Middleware pour parser le JSON

// Configuration de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Konoha Ninja Library API",
            version: "1.0.0",
            description: "API pour la gestion des rouleaux de jutsu, des ninjas et des emprunts.",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5001}/api/v1`, // L'URL de votre API
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Chemin vers vos fichiers de routes
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/jutsus', jutsuScrollRoutes);
app.use('/api/v1/ninjas', ninjaRoutes);
app.use('/api/v1/borrows', protect, borrowRoutes); // Sécurisez les routes des emprunts
// Endpoint pour migrer les données de test
app.get('/api/v1/seed', async (req, res) => {
    try {
        await seedDatabase();
        res.status(200).json({ message: 'Database seeded' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding database', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
