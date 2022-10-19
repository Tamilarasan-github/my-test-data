export class SearchCriteria {

    private key: string='';
    private operator: string='';
    private text: string='';
    private number: number=0;
    private stringList: string[]=[];
    private numberList: number[]=[];
    private numberFrom: number=0;
    private numberTo: number=0;
    private dateFrom: Date=new Date();
    private dateTo: Date=new Date();


	constructor() {
	}
    

    /**
     * Getter $key
     * @return {string}
     */
	public get $key(): string {
		return this.key;
	}

    /**
     * Getter $operator
     * @return {string}
     */
	public get $operator(): string {
		return this.operator;
	}

    /**
     * Getter $text
     * @return {string}
     */
	public get $text(): string {
		return this.text;
	}

    /**
     * Getter $number
     * @return {number}
     */
	public get $number(): number {
		return this.number;
	}

    /**
     * Getter $stringList
     * @return {string[]}
     */
	public get $stringList(): string[] {
		return this.stringList;
	}

    /**
     * Getter $numberList
     * @return {number[]}
     */
	public get $numberList(): number[] {
		return this.numberList;
	}

    /**
     * Getter $numberFrom
     * @return {number}
     */
	public get $numberFrom(): number {
		return this.numberFrom;
	}

    /**
     * Getter $numberTo
     * @return {number}
     */
	public get $numberTo(): number {
		return this.numberTo;
	}

    /**
     * Getter $dateFrom
     * @return {Date}
     */
	public get $dateFrom(): Date {
		return this.dateFrom;
	}

    /**
     * Setter $key
     * @param {string} value
     */
	public set $key(value: string) {
		this.key = value;
	}

    /**
     * Setter $operator
     * @param {string} value
     */
	public set $operator(value: string) {
		this.operator = value;
	}

    /**
     * Setter $text
     * @param {string} value
     */
	public set $text(value: string) {
		this.text = value;
	}

    /**
     * Setter $number
     * @param {number} value
     */
	public set $number(value: number) {
		this.number = value;
	}

    /**
     * Setter $stringList
     * @param {string[]} value
     */
	public set $stringList(value: string[]) {
		this.stringList = value;
	}

    /**
     * Setter $numberList
     * @param {number[]} value
     */
	public set $numberList(value: number[]) {
		this.numberList = value;
	}

    /**
     * Setter $numberFrom
     * @param {number} value
     */
	public set $numberFrom(value: number) {
		this.numberFrom = value;
	}

    /**
     * Setter $numberTo
     * @param {number} value
     */
	public set $numberTo(value: number) {
		this.numberTo = value;
	}

    /**
     * Setter $dateFrom
     * @param {Date} value
     */
	public set $dateFrom(value: Date) {
		this.dateFrom = value;
	}

}

