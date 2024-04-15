
    module.exports = function (app) {
        const modelName = 'ref_config';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   name: { type: String, unique: false, lowercase: false, default: '' },
       description: { type: String, unique: false, lowercase: false, default: '' },
       bedrockModelId: { type: String, unique: false, lowercase: false, default: '' },
       name1: { type: String, unique: false, lowercase: false, default: '' },
       human: { type: String, unique: false, lowercase: false, default: '' },
       task: { type: String, unique: false, lowercase: false, default: '' },
       noCondition: { type: String, unique: false, lowercase: false, default: '' },
       yesCondition: { type: String, unique: false, lowercase: false, default: '' },
       format: { type: String, unique: false, lowercase: false, default: '' },
       example: { type: String, unique: false, lowercase: false, default: '' },
       preamble: { type: String, unique: false, lowercase: false, default: '' },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };