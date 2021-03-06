/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mySqlProcedures',
  schema: true,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    nationalid: {
      type:'string',
      required: true,
      unique: true
    },
    fullname: {
      type: 'string',
      required: true
    },
    position: {
      type: 'integer',
      required: true
    },
    department: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    encryptedpassword: {
      type: 'string',
      minLength: 6
    },
    status: {
      type: 'integer',
      defaultsTo: 1
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      // delete obj.confirmation;
      delete obj.encryptedpassword;
      delete obj._csrf;
      return obj;
    }
  },

  beforeCreate: function (values, next) {
    /* This checks to make sure the password */
    // if (!values.password || values.password != values.confirmation) {
    //   return next({err: ["Password does not mactch password confirmation."]});
    // }
    var bcrypt = require('bcrypt');
    bcrypt.hash(values.password, bcrypt.genSaltSync(8), function passwordEncrypted(err, encryptedPassword) {
      console.log("password: " + values.password + "Encrypted password :  " + encryptedPassword);
      if (err) return next(err);
      values.encryptedpassword = encryptedPassword;
      // require('bcrypt').compare(values.password, encryptedPassword, function(err, result) {
      //  if (err) { throw (err); }
      //  console.log(result);
      // });
      // values.online = true;
      next();
    });
  },
};
