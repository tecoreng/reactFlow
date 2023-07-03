module.exports = app => {
    try {
    
        app.get('/', (req, res) => {
            res.send("Welcome to Flow")
        });

        // Require Category routes
        app.use("/v1/flow", require('./flow'));

    } catch (error) {
        console.log('error: ',error);
    }
}