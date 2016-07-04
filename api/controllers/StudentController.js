/**
 * StudentController
 *
 * @description :: Server-side logic for managing students
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res, next) {
		/* Create a student with params sent from the sign up for --> new.ejs */
		Student.create(req.params.all(), function studentCreated (err, student) {
			console.log(student);
			/* if there is an error */
			if (err) {
				console.log(err);
				req.session.flash = {
					err: err
				}

				/* if error redirect back to sign-up page*/
				return res.redirect('/student/new');
			}
			/* After successfully creating the user redirect to the new show action */
			res.redirect('/student/show/' + student.id);
		});
	},
};
