class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.verified = false;
    this.verificationToken = null;
    this.verificationTokenExpiry = null;
  }
}

module.exports = User;