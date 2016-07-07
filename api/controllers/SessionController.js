/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {


	'new': function (req, res) {
		res.view('session/new');
	},

	create: function(req, res, next) {

		/* Check for username and password in params sent via the form, if none */
		/* redirect the browser back to the sign in form */
		if(!req.param('email') || !req.param('password')) {
			/* return next({err: ["Password does not match password confirmation"]}) */

			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}];

			/* remeber that err is the object being passed down */
			req.session.flash = {
				err: usernamePasswordRequiredError
			}
			res.redirect('/');
			return;
		}

		/* Try to find the user by there username */
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);

			if (!user) {
				var noAccountError = [{name: 'noAccount', message: 'The email ' + req.param('email') + ' not found'}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			/* Compare password from the form params to the encrypted password of the user found */
			// require('bcrypt').compare('123', user.encryptedPassword, function(err, result) {
      // 	if (err) { throw (err); }
      //  	console.log(result);
			// 	});
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);
				if (!valid) {
					console.log(req.param('password') + valid + user.encryptedPassword);
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}];
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/');

					return;
				}

				if (user.status === 1) {
				/* Log in */
					req.session.authenticated = true;
					req.session.user = user;

					/* if the user is also an admin redirect to the user list */
					/* this is used in conjunction with config/policies */

					if (req.session.user.position === 100) {
						res.redirect('/user');
						return;
					}
					// res.redirect('/user/show/' + user.id);
					res.redirect('/procedure/main');
				} else {
						res.redirect('/');
				}
			});
		});
	},

	destroy: function(req, res, next) {

		/* view out the session (log out) */
		req.session.destroy();

		/* redirect the browser to the sign-in page */
		res.redirect('/');

	}
};
