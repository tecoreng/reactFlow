const FlowSchema = require('../../Schema/v1/flow');

class FlowModel {

    // Retrieve all categories
    async list() {
        return await FlowSchema.find();
    }

    // Create new category
    async add(data) {
        let storeObj = {
            nodes: data.nodes,
            edges: data.edges
        }
        if(data.id){
            return await FlowSchema.findByIdAndUpdate(data.id, storeObj);
        } else {
            return await FlowSchema.create(storeObj);
        }
    }

    // Retrieve a single category with id
    async findOne(request_id) {
        //return await FlowSchema.findById("64a278c2b57941518c41ab1f")
        return await FlowSchema.findOne()
        
    }

}

module.exports = FlowModel;


