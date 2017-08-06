/**
 * Angular configuration
 * @param $urlRouterProvider
 * @param $locationProvider
 */
export function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) {
	'ngInject';
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$urlRouterProvider.otherwise('/');
}