const FlowModel = new (require('../../Models/v1/flow'))();

class FlowsController {
    
    // Retrieve all categories
    async list(req, res) {
        try {
            let data = await FlowModel.findOne();
            res.handler.success(data, 'Flow List retrieved successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // Create new Flow
    async add(req, res) {
        try {
            if (!req.body) {
                return res.status(400).send({
                    message: "Please fill all required field"
                });
            } 

            let data = await FlowModel.add(req.body);
            res.handler.created(data, 'Flow data inserted successfully');
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}   

module.exports = FlowsController;
