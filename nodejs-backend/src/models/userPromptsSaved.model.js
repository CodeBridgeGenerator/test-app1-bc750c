
    module.exports = function (app) {
        const modelName = 'user_prompts_saved';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   chatAiId: { type: String, unique: false, lowercase: false, default: '' },
       savedUserid: { type: String, unique: false, lowercase: false, default: '' },
       configid: { type: String, unique: false, lowercase: false, default: '' },
       prompt: { type: String, unique: false, lowercase: false, default: '' },
       others: { type: String, unique: false, lowercase: false, default: '' },

            
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