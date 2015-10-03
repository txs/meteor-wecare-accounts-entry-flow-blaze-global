FlowRouter.route('/sign-in', {
   name: 'entrySignIn',
   triggersEnter: [
      function(context, redirect) {
         Session.set('entryError', undefined);
         Session.set('buttonText', 'in');
      }
   ],
   action: function(params) {
      var pkgRendered, userRendered;

      if (Meteor.userId()) {
         redirect(AccountsEntry.settings.dashboardRoute);
      }
      if (AccountsEntry.settings.signInTemplate) {
         this.template = AccountsEntry.settings.signInTemplate;
         pkgRendered = Template.entrySignIn.rendered;
         userRendered = Template[this.template].rendered;
         if (userRendered) {
            Template[this.template].rendered = function() {
               pkgRendered.call(this);
               return userRendered.call(this);
            };
         } else {
            Template[this.template].rendered = pkgRendered;
         }
         Template[this.template].events(AccountsEntry.entrySignInEvents);
         Template[this.template].helpers(AccountsEntry.entrySignInHelpers);
      }
      // BlazeLayout.render('entrySignIn');
      BlazeLayout.render('globalLayout', { 
          main: "entrySignIn",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});


FlowRouter.route('/sign-up', {
   name: 'entrySignUp',
   triggersEnter: [
      function(context, redirect) {
         Session.set('entryError', undefined);
         Session.set('buttonText', 'up');
      }
   ],
   action: function(params) {
     var pkgRendered, userRendered;
      if (AccountsEntry.settings.signUpTemplate) {
         this.template = AccountsEntry.settings.signUpTemplate;

         // If the user has a custom template, and not using the helper, then
         // maintain the package Javascript so that OpenGraph tags and share
         // buttons still work.
         pkgRendered = Template.entrySignUp.rendered;
         userRendered = Template[this.template].rendered;

         if (userRendered) {
            Template[this.template].rendered = function() {
               pkgRendered.call(this);
               return userRendered.call(this);
            };
         } else {
            Template[this.template].rendered = pkgRendered;
         }

         Template[this.template].events(AccountsEntry.entrySignUpEvents);
         Template[this.template].helpers(AccountsEntry.entrySignUpHelpers);
      }
      BlazeLayout.render('globalLayout', { 
          main: "entrySignUp",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
      // BlazeLayout.render('entrySignUp');
   }
});

clearEntryError = function(context, redirect) {
   Session.set('entryError', undefined);
};

FlowRouter.route('/forgot-password', {
   name: 'entryForgotPassword',
   triggersEnter: [clearEntryError],
   action: function() {
      // BlazeLayout.render('entryForgotPassword');
      BlazeLayout.render('globalLayout', { 
          main: "entryForgotPassword",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});

FlowRouter.route('/sign-out', {
   name: 'entrySignOut',
   triggersEnter: [
      function(context, redirect) {
         Session.set('entryError', undefined);
         if (AccountsEntry.settings.homeRoute) {
            Meteor.logout(function() {
               return FlowRouter.go(AccountsEntry.settings.homeRoute);
            });
         }
      }
   ],
   action: function() {
      // BlazeLayout.render('entrySignOut');
      BlazeLayout.render('globalLayout', { 
          main: "entrySignOut",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});

FlowRouter.route('/verification-pending', {
   name: 'entryVerificationPending',
   triggersEnter: [clearEntryError],
   action: function() {
      // BlazeLayout.render('entryVerificationPending');
      BlazeLayout.render('globalLayout', { 
          main: "entryVerificationPending",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});

FlowRouter.route('/reset-password/:resetToken', {
   name: 'entryResetPassword',
   triggersEnter: [
      function(context, redirect) {
         Session.set('entryError', undefined);
         Session.set('resetToken', this.params.resetToken);
      }
  ],
   action: function() {
      // BlazeLayout.render('entryResetPassword');
      BlazeLayout.render('globalLayout', { 
          main: "entryResetPassword",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});

FlowRouter.route('/enroll-account/:resetToken', {
   name: 'entryEnrollAccount',
   triggersEnter: [
      function(context, redirect) {
         Session.set('entryError', undefined);
         Session.set('resetToken', this.params.resetToken);
      }
  ],
   action: function() {
      // BlazeLayout.render('entryEnrollAccount');
      BlazeLayout.render('globalLayout', { 
          main: "entryEnrollAccount",
          headerTitle: "headerTitleIndex",
          headerButtonLeft: "",
          headerButtonRight: "",  
      });
   }
});

AccountsEntryRouteList = [
   'entrySignIn',
   'entrySignUp',
   'entryForgotPassword',
   'entrySignOut',
   'entryVerificationPending',
   'entryResetPassword',
   'entryEnrollAccount'
];

// set the fromWhere when you leave any path except the en
FlowRouter.triggers.exit([
      function(context) {
         Session.set('fromWhere', context.path);
      }
   ],
   { except: AccountsEntryRouteList }
);
