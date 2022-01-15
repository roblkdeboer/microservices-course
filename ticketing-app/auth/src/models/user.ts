import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
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

const User = mongoose.model('User', userSchema);

// Use the interface defined above.  Allows for type checking
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
