import { SearchCriteria } from "./my-search-criteria";

export class SubConditionsConnector {

    private subConditionIndex: number=0;
    private searchCriteria: SearchCriteria=new SearchCriteria();
    private operator: string='';


	constructor() {
	}


    /**
     * Getter $subConditionIndex
     * @return {number}
     */
	public get $subConditionIndex(): number {
		return this.subConditionIndex;
	}

    /**
     * Getter $searchCriteria
     * @return {SearchCriteria}
     */
	public get $searchCriteria(): SearchCriteria {
		return this.searchCriteria;
	}

    /**
     * Getter $operator
     * @return {string}
     */
	public get $operator(): string {
		return this.operator;
	}

    /**
     * Setter $subConditionIndex
     * @param {number} value
     */
	public set $subConditionIndex(value: number) {
		this.subConditionIndex = value;
	}

    /**
     * Setter $searchCriteria
     * @param {SearchCriteria} value
     */
	public set $searchCriteria(value: SearchCriteria) {
		this.searchCriteria = value;
	}

    /**
     * Setter $operator
     * @param {string} value
     */
	public set $operator(value: string) {
		this.operator = value;
	}

}