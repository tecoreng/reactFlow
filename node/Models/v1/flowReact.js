const categoriesSchema = require('../../Schema/v1/category');
const subcategoriesSchema = require('../../Schema/v1/subcategory');

class flowReactModel {

    // Retrieve all categories
    async list() {
        return await categoriesSchema.find();
    }

    // Create new category
    async add(data) {
        return await categoriesSchema.create(data);
    }

    // Retrieve a single category with id
    async findOne(request_id) {
        return await categoriesSchema.findById(request_id)
    }

    // Update a category with id
    async update(request_id, data) {
        return await categoriesSchema.findByIdAndUpdate(request_id, data,
            {
                new: true
            })
    }

    // Delete a category with id
    async delete(request_id) {
        return await categoriesSchema.findByIdAndRemove(request_id)
    }

    // Retrieve category with subcategory data
    async subcat() {
        return await categoriesSchema.aggregate([
            {
                $lookup: {
                    from: 'subcategories',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'data'
                },
            }
        ]);
        return await categoriesSchema.find().populate({ path: 'subcategory' });
    }

}

module.exports = CategoryModel;


