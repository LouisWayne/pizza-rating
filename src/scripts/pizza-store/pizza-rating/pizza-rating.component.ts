import { Ratings } from './pizza-rating';
import { PizzaRating } from './pizza-rating';
import { Events } from '../../constants';

interface IPizzaRatingScope extends angular.IScope {
	vm: {
		rating: PizzaRating;
		saveFn(): () => void;
		deleteFn(): (pizzaRating: PizzaRating) => void;

		maxRating: Ratings[];
		isEditMode: boolean;
		isDeleteMode: boolean;
		hoveredRating: number;

		hoverRating(rating: number, isMouseEnter: boolean): void;
		isShowStar(rating: number): boolean;
		updateRating(rating: number): void;
		saveChanges(pizzaRating: PizzaRating): void;
		deleteRating(pizzaRating: PizzaRating): void;
		exitAllModes(): void;
		enterEditMode(): void;
		enterDeleteMode(): void;
	};
}

export class PizzaRatingComponent implements angular.IComponentOptions {
	public templateUrl: string = './scripts/pizza-store/pizza-rating/pizza-rating.html';
	public controllerAs: string = 'vm';

	public bindings: { [boundProperty: string]: string; } = {
		rating: '=',
		saveFn: '&',
		deleteFn: '&'
	};

	public controller = ($scope: IPizzaRatingScope): void => {
		'ngInject';
		let vm = $scope.vm;

		vm.maxRating = new Array(Ratings.FIVE);
		vm.isEditMode = false;
		vm.isDeleteMode = false;

		$scope.$on(Events.CHANGE_SELECTED_PIZZA_STORE, () => {
			vm.exitAllModes();
		});

		/**
		 * Mouse hover event on star icons
		 */
		vm.hoverRating = function(rating: number, isMouseEnter: boolean): void {
			vm.hoveredRating = isMouseEnter ? rating : null;
		};

		/**
		 * Star icon visibility handler
		 */
		vm.isShowStar = function(rating: number): boolean {
			if(vm.hoveredRating) {
				return vm.hoveredRating >= rating;
			}
			else if(vm.rating.userRating) {
				return vm.rating.userRating >= rating;
			}
		};

		/**
		 * Star icon click event
		 */
		vm.updateRating = function(rating: number): void {
			vm.rating.userRating = rating;
			vm.saveFn()();
		};

		/**
		 * Save PizzaRating
		 */
		vm.saveChanges = function(pizzaRating: PizzaRating): void {
			vm.saveFn()();
			vm.exitAllModes();
		};

		/**
		 * Delete PizzaRating
		 */
		vm.deleteRating = function(pizzaRating: PizzaRating): void {
			vm.deleteFn()(pizzaRating);
		};

		/**
		 * Exit Edit and Delete mode
		 */
		vm.exitAllModes = function(): void {
			vm.isEditMode = false;
			vm.isDeleteMode = false;
		};

		/**
		 * Enter Edit mode
		 */
		vm.enterEditMode = function() {
			vm.isEditMode = true;
		};

		/**
		 * Enter Delete mode
		 */
		vm.enterDeleteMode = function() {
			vm.isDeleteMode = true;
		};
	}
}