
    module.exports = function (app) {
        const modelName = 'ref_fa_docs';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   filename: { type: String, unique: false, lowercase: false, default: '' },
       bankId: { type: String, unique: false, lowercase: false, default: '' },
       facilityid: { type: String, unique: false, lowercase: false, default: '' },
       startDate: { type: String, unique: false, lowercase: false, default: '' },
       endDate: { type: String, unique: false, lowercase: false, default: '' },
       version: { type: String, unique: false, lowercase: false, default: '' },
       s3Link: { type: String, unique: false, lowercase: false, default: '' },

            
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