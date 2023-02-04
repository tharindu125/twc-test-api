const mongoose = require("mongoose");

const { Schema } = mongoose;

const userScheme = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

userScheme.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw Error("User not found");
  if (user.password != password) throw Error("Password mismatch");
  return user;
};

{
  module.exports = mongoose.models.user || mongoose.model("user", userScheme);
}
