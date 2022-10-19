import { SubConditionsConnector } from "./my-sub-conditions-connector";

export class ConditionsConnector {

    private conditionIndex: number=0;
    private subConditionsConnector: SubConditionsConnector[]=[];
    private operator: string='';


	constructor() {
	}


    /**
     * Getter $conditionIndex
     * @return {number}
     */
	public get $conditionIndex(): number {
		return this.conditionIndex;
	}

    /**
     * Getter $subConditionsConnector
     * @return {SubConditionsConnector[]}
     */
	public get $subConditionsConnector(): SubConditionsConnector[] {
		return this.subConditionsConnector;
	}

    /**
     * Getter $operator
     * @return {string}
     */
	public get $operator(): string {
		return this.operator;
	}

    /**
     * Setter $conditionIndex
     * @param {number} value
     */
	public set $conditionIndex(value: number) {
		this.conditionIndex = value;
	}

    /**
     * Setter $subConditionsConnector
     * @param {SubConditionsConnector[]} value
     */
	public set $subConditionsConnector(value: SubConditionsConnector[]) {
		this.subConditionsConnector = value;
	}

    /**
     * Setter $operator
     * @param {string} value
     */
	public set $operator(value: string) {
		this.operator = value;
	}

}