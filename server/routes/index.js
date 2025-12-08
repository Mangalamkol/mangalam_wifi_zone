const express = require('express');\nconst router = express.Router();\nconst authRoutes = require('./authRoutes');\nrouter.use('/auth', authRoutes);\nmodule.exports = router;\n
