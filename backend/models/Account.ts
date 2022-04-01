import { model, Schema } from 'mongoose';
import { hash } from 'bcrypt';


const AccountSchema = new Schema({
  username: { type: String, required: true, unique: true, validate:[({length}:{length:number})=>length>=8,'Username must be at least 8 characters']},
  password: { type: String, required: true, match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character']},
  email: { type: String, required: true,unique:true, match: [/.+@.+\..+/, 'Please enter a valid e-mail address']},
  binders: [{ type: Schema.Types.ObjectId, ref: 'Binder' }]
});

AccountSchema.pre('save',async function(next) {

  this.password = await hash(this.password, 10);
  return next();
});

export const Account = model('Account', AccountSchema);