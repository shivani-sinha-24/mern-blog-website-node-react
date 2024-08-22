// CORS configuration
const corsOptions = {
    origin: '*', // You can specify an array of allowed origins or keep it as '*' to allow all
    credentials: true, // Enables Access-Control-Allow-Credentials header
    methods: "GET,HEAD,OPTIONS,POST,PUT,DELETE", // Allowed methods
    allowedHeaders: "Authorization,X-ACCESS_TOKEN,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers", // Allowed headers
    optionsSuccessStatus: 200 // For legacy browser support
};

export default corsOptions