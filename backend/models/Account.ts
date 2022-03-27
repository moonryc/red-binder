import { model, Schema } from 'mongoose';


const AccountSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});


export const Account = model('Account', AccountSchema);