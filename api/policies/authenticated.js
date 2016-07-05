/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, ok) {

  /* User is allowed, processed to controller */
  if(req.session.authenticated) {
    return ok();
  }

  /* User is not allowed */
  else {
    requireLoginError = [{ name: 'requireLogin', message: 'You must be login'}];
    req.session.flash = {
      err: requireLoginError
    }

    res.redirect('/');
    return;
  }
};
