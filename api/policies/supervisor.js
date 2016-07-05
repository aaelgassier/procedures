/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any assistant and supervisors to be authenticated
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, ok) {

  /* User is allowed, processed to controller */
  if(req.session.user && req.session.user.position == 1) {
    return ok();
  }

  /* User is not allowed */
  else {
    requireAdminError = [{ name: 'requireAssistantSupervsior', message: 'You do not have a right permission'}];
    req.session.flash = {
      err: requireAssistantSupervsior
    }

    res.redirect('/');
    return;
  }
};
