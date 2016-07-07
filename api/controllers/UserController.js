/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/* This action is to create a new user (employee) */
	signup: function(req, res, next) {
		/* Store all parameter filled up */
		User.create(req.params.all(), function userCreated (err, user) {
			/* if there is an error */
			if (err) {
				req.session.flash = {
					err: err
				}
				/* if error redirect back to sign-up page*/
				return res.redirect('../404');
			}
			if (!user) {
				return res.redirect('/')
			}
			/* After successfully creating the user redirect to the new show action */
			if (user) {
				res.redirect('/user/show/' + user.id);
			}
		});
	},

	/* render the profie view --> /views/show.ejs*/
	show: function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next();
			res.view({
				user: user
			});
		});
	},

	/* List of all users */
	index: function (req, res, next) {
		/* Get an array of all users in the User collection */
		User.find(function foundUsers (err, users) {
			if (err) return next(err);
			/* pass the array down to the /views/index.ejs page */
			res.view({
				users: users
			});
		});
	},

	/* render the edit view (e.g. /views/user/edit.ejs)*/
	edit: function (req, res, next) {
		/* find the user from the id passed in via params*/
		User.findOne(req.param('id'), function foundUser (err, user){
			if (err) return next(err);
			if (!user) return next('User does not exist.');

			res.view({
				user: user
			});
		});
	},

	/* Process the info from edit view */
	update: function (req, res, next) {
		// req.params.all()
		User.update(req.param('id'), req.params.all(), function userUpdated(err) {
			if (err) {
				/* if there is an error, it will be redirect to edit page again*/
				return res.redirect('/user/edit/' + req.param('id'));
			}
			res.redirect('/user/show/' + req.param('id'));
		});
	},

	/* Delete a user account */
	destroy: function (req, res, next) {
		/* Find a user account that would be deleted*/
		User.findOne(req.param('id'), function foundUser (err, user){
			if (err) return next(err);

			if (!user) return next('User does not exist.');

			User.destroy(req.param('id'), function userDestroyed(err) {
				if (err) return next(err);
			});

			res.redirect('/user');
		});
	}
};
