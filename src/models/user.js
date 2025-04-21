import mongoose from 'mongoose';
import { bcrypt } from 'bcrypt'; // import bcrypt for password hashing
const { Schema } = mongoose;

// create the user schema
const userSchema = new Schema(
  {
    // first name
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
    },
    // last name
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
    },
    // email address
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // basic email regex
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    // password
    password: {
      type: String,
      required: [true, 'Password is required.'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// hasd the password before saving (using mongoose middleware)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // hash with salt factor 10
  }
  next();
});

// method to compare passwords during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// index the createdAt field for sorting
userSchema.index({ createdAt: -1 }); // -1 indicates descending order is common for this sort

// create the user model
const User = mongoose.model('User', userSchema);

// export the user model
export { User };
