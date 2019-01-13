var express = require('express');
var routes = express();
var projectRoutes = require('./project/project.route');
var loginRoutes = require('./login/login.route');
var newsRoutes = require('./news/news.route');
var accountRoutes = require('./account/account.route');
var transactionRoutes = require('./transaction/transaction.route');
var galleryRoutes = require('./gallery/gallery.route');
var requestRotes = require('./request/request.route');
var MembershipRoutes = require('./membership/membership.route');
var logRoutes = require('./log/log.route');
var mailRoutes = require('./mail/mail.route');
var commentRoutes = require('./comment/comment.route');
var admissionRoutes = require('./admission/admission.route');
var excoRoutes = require('./exco/exco.route');
var postRoutes = require('./post/post.route');
var taskRoutes = require('./task/task.route');

routes.use('/projects', projectRoutes);
routes.use('/news', newsRoutes);
routes.use('/login', loginRoutes);
routes.use('/account', accountRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/gallery', galleryRoutes);
routes.use('/request', requestRotes);
routes.use('/membership', MembershipRoutes);
routes.use('/logs', logRoutes);
routes.use('/mail', mailRoutes);
routes.use('/comment', commentRoutes);
routes.use('/admission', admissionRoutes);
routes.use('/exco', excoRoutes);
routes.use('/posts', postRoutes);
routes.use('/tasks', taskRoutes);

module.exports = routes;