/**
 * Home configuration
 * @param  
 */
export function config($stateProvider: ng.ui.IStateProvider): void {
	'ngInject';

	$stateProvider.state('home', {
		url: '/',
		templateUrl: './scripts/home/home.html'
	})
}