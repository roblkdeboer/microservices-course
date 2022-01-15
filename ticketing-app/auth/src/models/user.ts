import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
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
// Use the interface defined above.  Allows for type checking
// How to add a function to a model in mongoose
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Use the interface above to add type definitions to the build property
const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };
