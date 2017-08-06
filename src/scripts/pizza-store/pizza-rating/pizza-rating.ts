export const enum Ratings {
	NONE,
	ONE,
	TWO,
	THREE,
	FOUR,
	FIVE
}

export class PizzaRating {
	private pizzaName: string;
	public userRating: Ratings;
	private userMemo: string;

	constructor(pizzaName?: string, userRating?: Ratings) {
		this.pizzaName = pizzaName;

		if(userRating == null) {
			this.userRating = Ratings.NONE;
		}
		else {
			this.userRating = userRating;
		}
	}

	/**
	 * Return string with double quote like: "userMemo"
	 */
	getUserMemo(): string {
		return this.userMemo ? '"' + this.userMemo + '"' : '';
	}
}
