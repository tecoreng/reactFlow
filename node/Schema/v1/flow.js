const mongoose = require("mongoose");

const FlowSchema = mongoose.Schema({
  nodes: {
    type: Array,
    //required: [true, 'flow nodes is Required']
  },
  edges: {
    type: Array,
    //required: [true, 'flow edges is Required']
  }
},
  {
    timestamps: true
  });

// Changing "_id" key to "id"
FlowSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

FlowSchema.set('toJSON', {
  virtuals: true
});

// Export the model
module.exports = mongoose.model('flow', FlowSchema);
