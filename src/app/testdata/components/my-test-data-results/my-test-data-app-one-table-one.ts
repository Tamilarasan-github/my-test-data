export class TestDataAppOneTableOne {

        public testDataId: number;
      //  public meta_data_id: number;
        public testRowDetail: number;
        public deleteFlag: string;
        public column1: string;
        public column2: string;
        public column3: string;
        public column4: string;
        public column5: string

    constructor()
    {
      this.testDataId=0;
      this.testRowDetail=0;
      this.deleteFlag="N";
      this.column1="";
      this.column2="";
      this.column3="";
      this.column4="";
      this.column5="";
    }
    

    /**
     * Getter $testDataId
     * @return {number}
     */
	public get $testDataId(): number {
		return this.testDataId;
	}

    /**
     * Getter $testRowDetail
     * @return {number}
     */
	public get $testRowDetail(): number {
		return this.testRowDetail;
	}

    /**
     * Getter $deleteFlag
     * @return {string}
     */
	public get $deleteFlag(): string {
		return this.deleteFlag;
	}

    /**
     * Getter $column1
     * @return {string}
     */
	public get $column1(): string {
		return this.column1;
	}

    /**
     * Getter $column2
     * @return {string}
     */
	public get $column2(): string {
		return this.column2;
	}

    /**
     * Getter $column3
     * @return {string}
     */
	public get $column3(): string {
		return this.column3;
	}

    /**
     * Getter $column4
     * @return {string}
     */
	public get $column4(): string {
		return this.column4;
	}

    /**
     * Setter $testDataId
     * @param {number} value
     */
	public set $testDataId(value: number) {
		this.testDataId = value;
	}

    /**
     * Setter $testRowDetail
     * @param {number} value
     */
	public set $testRowDetail(value: number) {
		this.testRowDetail = value;
	}

    /**
     * Setter $deleteFlag
     * @param {string} value
     */
	public set $deleteFlag(value: string) {
		this.deleteFlag = value;
	}

    /**
     * Setter $column1
     * @param {string} value
     */
	public set $column1(value: string) {
		this.column1 = value;
	}

    /**
     * Setter $column2
     * @param {string} value
     */
	public set $column2(value: string) {
		this.column2 = value;
	}

    /**
     * Setter $column3
     * @param {string} value
     */
	public set $column3(value: string) {
		this.column3 = value;
	}

    /**
     * Setter $column4
     * @param {string} value
     */
	public set $column4(value: string) {
		this.column4 = value;
	}

    
}
