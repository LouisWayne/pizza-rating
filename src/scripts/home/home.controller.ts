import { PizzaStoreService } from '../pizza-store/pizza-store.service';
import { PizzaStore } from '../pizza-store/pizza-store';

export class HomeController implements angular.IController {
	private pizzaStores: PizzaStore[];

	constructor(PizzaStoreService: PizzaStoreService) {
		'ngInject';
		this.pizzaStores = PizzaStoreService.loadPizzaStores();
	}
}
