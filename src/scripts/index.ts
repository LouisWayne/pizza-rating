import * as angular from 'angular';
import 'jquery';
import '@uirouter/angularjs';

import { config } from './config';
import { run } from './run';
import './home';
import './pizza-store'

angular.module('app', [
				'ui.router', 
				'app.home',
				'app.pizzastore'
			])
			.config(config)
			.run(run);
