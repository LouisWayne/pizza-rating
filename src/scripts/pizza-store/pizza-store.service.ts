import { PizzaNames } from '../constants';
import { PizzaStore } from './pizza-store';
import { PizzaRating } from './pizza-rating/pizza-rating';

const LOCAL_STORAGE_PIZZA_STORES: string = 'pizzaStores';

export class PizzaStoreService {
	private $window: angular.IWindowService;

	constructor($window: angular.IWindowService) {
		'ngInject';
		this.$window = $window;
	}

	/**
	 * Return a list of PizzaStore
	 * If there is saved pizza store information in localStorage, return it
	 * Otherwise, initialize pizza stores, then return it
	 */
	public loadPizzaStores(): PizzaStore[] {
		let pizzaStores: PizzaStore[] = null;
		let pizzaStoresJson: string = this.loadFromLocalStorage(LOCAL_STORAGE_PIZZA_STORES);
		
		if(pizzaStoresJson) {
			pizzaStores = angular.fromJson(pizzaStoresJson);

			// Assign prototype functions
			for(let i in pizzaStores) {
				pizzaStores[i] = angular.extend(new PizzaStore(), pizzaStores[i]);
				pizzaStores[i].initPizzaRatings();
			}
		}
		else {
			pizzaStores = this.initPizzaStores();
		}

		return pizzaStores;
	}

	/**
	 * Save pizzaStores in localStorage
	 * @param pizzaStores 
	 */
	public savePizzaStores(pizzaStores: PizzaStore[]): void {
		this.saveInLocalStorage(LOCAL_STORAGE_PIZZA_STORES, angular.toJson(pizzaStores));
	}

	/**
	 * Load data from localStorage
	 * @param key 
	 */
	private loadFromLocalStorage(key: string): string {
		return this.$window.localStorage.getItem(key);
	}

	/**
	 * Save data in localStorage
	 * @param key 
	 * @param data 
	 */
	private saveInLocalStorage(key: string, data: string): void {
		this.$window.localStorage.setItem(key, data);
	}

	/**
	 * Initialize pizza stores with its pizza rating information
	 */
	private initPizzaStores(): PizzaStore[] {
		return [
			this.initMario(), 
			this.initFrank(),
			this.initLaVenezia(),
			this.initRaimo(),
			this.initLia()
		];
	}

	/**
	 * Initialize Mario pizza with pizza rating information
	 */
	private initMario(): PizzaStore {
		let pizzaRatings: PizzaRating[] = [
			new PizzaRating(PizzaNames.PLAIN),
			new PizzaRating(PizzaNames.SICILIAN),
			new PizzaRating(PizzaNames.EGGPLANT),
			new PizzaRating(PizzaNames.PEPPERONI),
			new PizzaRating(PizzaNames.MUSHROOM),
			new PizzaRating(PizzaNames.STUFFED_CHICKEN),
			new PizzaRating(PizzaNames.SAUSAGE),
			new PizzaRating(PizzaNames.CHICKEN),
			new PizzaRating(PizzaNames.MARGHERITA),
			new PizzaRating(PizzaNames.SPINACH),
			new PizzaRating(PizzaNames.GLUETEN_FREE),
			new PizzaRating(PizzaNames.WHITE),
			new PizzaRating(PizzaNames.SALAD),
			new PizzaRating(PizzaNames.VEGETABLE),
			new PizzaRating(PizzaNames.BUFFALO_CHICKEN)
		];

		let marioPizza = new PizzaStore('Mario', pizzaRatings, 'http://www.mariospizzaonline.com/');
		return marioPizza;
	};

	/**
	 * Initialize Frank pizza with pizza rating information
	 */
	private initFrank(): PizzaStore {
		let pizzaRatings: PizzaRating[] = [
			new PizzaRating(PizzaNames.PLAIN),
			new PizzaRating(PizzaNames.SICILIAN),
			new PizzaRating(PizzaNames.MARGHERITA),
			new PizzaRating(PizzaNames.MEAT),
			new PizzaRating(PizzaNames.MARIANARA),
			new PizzaRating(PizzaNames.VEGETABLE),
			new PizzaRating(PizzaNames.ITALYS_FAVORITE),
			new PizzaRating(PizzaNames.PASTA),
			new PizzaRating(PizzaNames.FLORENTINE),
			new PizzaRating(PizzaNames.SAUSAGE),
			new PizzaRating(PizzaNames.MUSHROOM),
			new PizzaRating(PizzaNames.BROCCOLI)
		];

		let frankPizza = new PizzaStore('Frank\'s Gourmet', pizzaRatings, 'http://www.yourhideawayinwoodbury.com/');
		return frankPizza;
	};

	/**
	 * Initialize La Venezia pizza with pizza rating information
	 */
	private initLaVenezia(): PizzaStore {
		let pizzaRatings: PizzaRating[] = [
			new PizzaRating(PizzaNames.PLAIN),
			new PizzaRating(PizzaNames.CHICKEN),
			new PizzaRating(PizzaNames.PEPPERONI),
			new PizzaRating(PizzaNames.SICILIAN),
			new PizzaRating(PizzaNames.BUFFALO_CHICKEN)
		];

		let laVeneziaPizza = new PizzaStore('La Venezia', pizzaRatings);
		return laVeneziaPizza;
	}

	/**
	 * Initialize Raimo pizza with pizza rating information
	 */
	private initRaimo(): PizzaStore {
		let pizzaRatings: PizzaRating[] = [
			new PizzaRating(PizzaNames.PLAIN),
			new PizzaRating(PizzaNames.BUFFALO_CHICKEN),
			new PizzaRating(PizzaNames.SICILIAN),
			new PizzaRating(PizzaNames.STUFFED_CHICKEN),
			new PizzaRating(PizzaNames.SAUSAGE),
			new PizzaRating(PizzaNames.PEPPERONI),
			new PizzaRating(PizzaNames.MARIANARA)
		];

		let raimoPizza = new PizzaStore('Raimo', pizzaRatings, 'http://www.raimopizzeria.com/');
		return raimoPizza;
	}

	/**
	 * Initialize Lia pizza with pizza rating information
	 */
	private initLia(): PizzaStore {
		let pizzaRatings: PizzaRating[] = [
			new PizzaRating(PizzaNames.PLAIN),
			new PizzaRating(PizzaNames.BBQ_CHICKEN),
			new PizzaRating(PizzaNames.BUFFALO_CHICKEN),
			new PizzaRating(PizzaNames.SICILIAN),
			new PizzaRating(PizzaNames.PEPPERONI),
			new PizzaRating(PizzaNames.MEATBALL),
			new PizzaRating(PizzaNames.SAUSAGE),
			new PizzaRating(PizzaNames.ZITI),
			new PizzaRating(PizzaNames.BRUSHETTA),
			new PizzaRating(PizzaNames.MARGHERITA)
		];

		let liaPizza = new PizzaStore('Lia', pizzaRatings, 'http://www.liaspizzeria.com/');
		return liaPizza;
	}
}