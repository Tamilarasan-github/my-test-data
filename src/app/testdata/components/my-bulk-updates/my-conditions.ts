import { ConditionsConnector } from "./my-conditions-connector";

export class Conditions
{

    private conditionsConnector: ConditionsConnector[]=[];


	constructor() {
	}



    /**
     * Getter $conditionsConnector
     * @return {ConditionsConnector[]}
     */
	public get $conditionsConnector(): ConditionsConnector[] {
		return this.conditionsConnector;
	}

    /**
     * Setter $conditionsConnector
     * @param {ConditionsConnector[]} value
     */
	public set $conditionsConnector(value: ConditionsConnector[]) {
		this.conditionsConnector = value;
	}
 

}