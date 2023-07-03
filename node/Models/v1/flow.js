const FlowSchema = require('../../Schema/v1/flow');

class FlowModel {

    // Retrieve all categories
    async list() {
        return await FlowSchema.find();
    }

    // Create new category
    async add(data) {
        let id = data.id
        let storeObj = {
            nodes: data.nodes,
            edges: data.edges
        }
        return await FlowSchema.findByIdAndUpdate(id, storeObj,
            {
                new: true
            });
    }

    // Retrieve a single category with id
    async findOne(request_id) {
        //return await FlowSchema.findById("64a278c2b57941518c41ab1f")
        return await FlowSchema.findById("64a2dbd45622406051856cff")
        
    }

}

module.exports = FlowModel;


