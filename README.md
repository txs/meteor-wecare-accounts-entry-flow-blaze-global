This is a account Entry that works with FlowRouter 2.0 and Blaze layout.
A fix to use Blaze layout instead of flow layout.
Do the Blaze layout in a global way.
.

## Getting started

Install:

```
meteor add dovrosenberg:accounts-entry-flow
```

See the [original](https://github.com/Differential/accounts-entry) package for more details on usage and examples.  The differences are described here:

## Ensuring signed in users for routes

Use the helper function AccountsEntrySignInRequired in an entry trigger for any route that requires users to be signed in.  This will redirect the user to the included sign-in page and stop any rendering. Accounts-entry also tracks where the user was trying to go and will route them back after sign in.

Here is a route example:

````js
FlowRouter.route('/dashboard', {
		name: 'dashboard',
		triggersEnter: [
			AccountsEntrySignInRequired
		],
		action: function(params) {
			FlowLayout.render('dashboard');
		}
	}
);
````

You can also apply this to every route at once (making sure to exclude the logged out route):
````js
FlowRouter.triggers.enter([AccountsEntrySignInRequired], {except: ['loggedOut']});
````

If you want to change the render you can always use the triggers in FlowRouter:
````js
FlowRouter.triggers.enter([trackRouteEntry], {only: ["entrySignIn"]});
````
