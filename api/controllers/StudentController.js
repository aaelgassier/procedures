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
	/* render the profie view --> /views/show.ejs*/
	show: function (req, res, next) {
		Student.findOne(req.param('id'), function foundStudent (err, student) {
			if (err) return next(err);
			if (!student) return next();
			res.view({
				student: student
			});
		});
	},

	/* List of all students */
	index: function (req, res, next) {

		Student.find(function foundStudents (err, students) {
			if (err) return next(err);
			/* pass the array down to the /views/index.ejs page */
			res.view({
				students: students
			});
		});
	},

	/* render the edit view (e.g. /views/user/edit.ejs)*/
	edit: function (req, res, next) {
		/* find the user from the id passed in via params*/
		Student.findOne(req.param('id'), function foundStudent (err, student){
			if (err) return next(err);
			if (!student) return next('Student does not exist.');

			res.view({
				student: student
			});
		});
	},

	/* Process the info from edit view */
	update: function (req, res, next) {
		Student.update(req.param('id'), req.params.all(), function studentUpdated(err) {
			if (err) {
				return res.redirect('/student/edit/' + req.param('id'));
			}
			res.redirect('/student/show/' + req.param('id'));
		});
	},

	destroy: function (req, res, next) {
		Student.findOne(req.param('id'), function foundStudent (err, student){
			if (err) return next(err);

			if (!student) return next('Student does not exist.');

			Student.destroy(req.param('id'), function studentDestroyed(err) {
				if (err) return next(err);
			});

			res.redirect('/student');
		});
	},

};
