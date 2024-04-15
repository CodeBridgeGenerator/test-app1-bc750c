
    module.exports = function (app) {
        const modelName = 'prompts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   sessionid: { type: String, unique: false, lowercase: false, default: '' },
       chataiid: { type: String, unique: false, lowercase: false, default: '' },
       configid: { type: String, unique: false, lowercase: false, default: '' },
       prompt: { type: String, unique: false, lowercase: false, default: '' },
       refDocs: { type: String, unique: false, lowercase: false, default: '' },
       responseText: { type: String, unique: false, lowercase: false, default: '' },
       systemId: { type: String, unique: false, lowercase: false, default: '' },
       type: { type: String, unique: false, lowercase: false, default: '' },
       role: { type: String, unique: false, lowercase: false, default: '' },
       model: { type: String, unique: false, lowercase: false, default: '' },
       stopReason: { type: String, unique: false, lowercase: false, default: '' },
       stopSequence: { type: String, unique: false, lowercase: false, default: '' },
       inputTokens: { type: String, unique: false, lowercase: false, default: '' },
       outputTokens: { type: String, unique: false, lowercase: false, default: '' },
       cost: { type: String, unique: false, lowercase: false, default: '' },
       status: { type: String, unique: false, lowercase: false, default: '' },
       error: { type: String, unique: false, lowercase: false, default: '' },

            
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