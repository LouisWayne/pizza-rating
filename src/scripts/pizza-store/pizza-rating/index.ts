import * as angular from 'angular';

import { PizzaRatingComponent } from './pizza-rating.component';

angular.module('app.pizzarating', [])
			.component('pizzaRating', new PizzaRatingComponent());