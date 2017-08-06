import * as angular from 'angular';
import '@uirouter/angularjs'

import { HomeController } from './home.controller';
import { config as HomeConfig } from './home.config';

angular.module('app.home', [
				'ui.router'
			])
			.controller('HomeCtrl', HomeController)
			.config(HomeConfig);