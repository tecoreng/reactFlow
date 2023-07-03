module.exports = app => {
    try {
    
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        // Require Category routes
        app.use("/" + process.env.API_VERSION_v1 + "/flow", require('./flow'));

    } catch (error) {
        console.log('error: ',error);
    }
}