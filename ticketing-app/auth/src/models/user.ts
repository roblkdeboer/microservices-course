import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
// Returns an instance with userdoc instance
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Anytime a document is saved, this function is executed (middleware)
// Call done once all the work in the function is done
userSchema.pre('save', async function (done) {
  // Only attempt to hash the password if it has been modified
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    // Set password in user document with new hashed password
    this.set('password', hashed);
  }
  done();
});

// Use the interface defined above.  Allows for type checking
// How to add a function to a model in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Use the interface above to add type definitions to the build property
// Pass in the UserDoc interface and returns a UserModel interface
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const user = User.build({
  email: 'test@test.com',
  password: 'ae43123',
});

user.email;

export { User };
