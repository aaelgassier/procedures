/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signup: function(req, res) {
		User.create(req.params.all(), function userCreated (err, user) {
			console.log(user);
			/* if there is an error */
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				/* if error redirect back to sign-up page*/
				// return res.redirect('/user/new');
				console.log("ERRR");
			}

			/* Log user in */
			req.session.authenticated = true;
			req.session.user = user;

			/* After successfully creating the user redirect to the new show action */
			// res.redirect('/user/show/' + user.id);
			console.log("FFF");
		});
	}
};
