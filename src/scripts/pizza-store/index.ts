import * as angular from 'angular';
import '@uirouter/angularjs'

import { PizzaStoreComponent } from './pizza-store.component';
import { PizzaStoreService } from './pizza-store.service';
import './pizza-rating'

angular.module('app.pizzastore', [
				'ui.router',
				'app.pizzarating'
			])
			.component('pizzaStore', new PizzaStoreComponent())
			.service('PizzaStoreService', PizzaStoreService);