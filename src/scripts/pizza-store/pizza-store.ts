import { PizzaRating } from './pizza-rating/pizza-rating';

export class PizzaStore {
	private storeName: string;
	public pizzaRatings: PizzaRating[];
	private websiteAddress: string;

	constructor(storeName?: string, pizzaRatings?: PizzaRating[], websiteAddress?: string) {
		this.storeName = storeName;
		this.pizzaRatings = pizzaRatings;
		this.websiteAddress = websiteAddress;
	}

	/**
	 * Return a string: storeName's PIZZARIA
	 */
	getStoreName(): string {
		return this.storeName ? this.storeName.toUpperCase() + '\'S PIZZARIA' : '';
	}

	/**
	 * Assign PizzaRating prototype functions
	 */
	initPizzaRatings(): void {
		for(let i in this.pizzaRatings) {
			if(!(this.pizzaRatings[i] instanceof PizzaRating)) {
				this.pizzaRatings[i] = angular.extend(new PizzaRating(), this.pizzaRatings[i]);
			}
		}
	}
}