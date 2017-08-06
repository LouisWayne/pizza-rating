import { PizzaStore } from './pizza-store';
import { PizzaRating } from './pizza-rating/pizza-rating';
import { PizzaStoreService } from './pizza-store.service';
import { Events } from '../constants';

interface IPizzaStoreScope extends angular.IScope {
	vm: {
		storeList: PizzaStore[];
		selectedStore: PizzaStore;

		loadStore(pizzaStore: PizzaStore): void;
		saveChanges(): void;
		addPizzaRating(): void;
		deletePizzaRating(pizzaRating: PizzaRating): void;
	};
}

export class PizzaStoreComponent implements angular.IComponentOptions {
	public templateUrl: string = './scripts/pizza-store/pizza-store.html';
	public controllerAs: string = 'vm';

	public bindings: { [boundProperty: string]: string; } = {
		storeList: '='
	};

	public controller = ($scope: IPizzaStoreScope, PizzaStoreService: PizzaStoreService): void => {
		'ngInject';
		let vm = $scope.vm;
		vm.selectedStore = null;
		
		/**
		 * Pizza store click event
		 */
		vm.loadStore = function(selectedStore: PizzaStore): void {
			vm.selectedStore = selectedStore;
			$scope.$broadcast(Events.CHANGE_SELECTED_PIZZA_STORE);
		};

		/**
		 * Save current pizza stores
		 */
		vm.saveChanges = function(): void {
			PizzaStoreService.savePizzaStores(vm.storeList);
		};

		/**
		 * Add a new pizza rating
		 */
		vm.addPizzaRating = function(): void {
			vm.selectedStore.pizzaRatings.push(new PizzaRating('New Pizza'));
			vm.saveChanges();
		};

		/**
		 * Delete pizza rating
		 */
		vm.deletePizzaRating = function(deletingPizzaRating: PizzaRating): void {
			let removingIdx = vm.selectedStore.pizzaRatings.indexOf(deletingPizzaRating);
			vm.selectedStore.pizzaRatings.splice(removingIdx, 1);
			vm.saveChanges();
		};
	}
}