export class TestFieldsInfo
{
    public  field_id: number=0;
	public  field_name: string='';
	public  field_name_api: string='';
	public  field_name_db: string='';
    public  ui_screen_name: string='';
	public  field_data_type: string='';
	public  table_id: number=0;
	public  field_order: string='';
	public  delete_flag: string='';
	public  created_by: string='';
	public  created_on: Date=new Date;
	public  updated_by: string='';
	public  updated_on: Date=new Date; 


	constructor() {
	}

    /**
     * Getter $field_id
     * @return {number}
     */
	public get $field_id(): number {
		return this.field_id;
	}

    /**
     * Getter $field_name
     * @return {string}
     */
	public get $field_name(): string {
		return this.field_name;
	}

    /**
     * Getter $field_name_api
     * @return {string}
     */
	public get $field_name_api(): string {
		return this.field_name_api;
	}

    /**
     * Getter $field_name_db
     * @return {string}
     */
	public get $field_name_db(): string {
		return this.field_name_db;
	}

     /**
     * Getter $field_name_db
     * @return {string}
     */
	public get $ui_screen_name(): string {
		return this.ui_screen_name;
	}

    /**
     * Getter $field_data_type
     * @return {string}
     */
	public get $field_data_type(): string {
		return this.field_data_type;
	}

    /**
     * Getter $table_name
     * @return {string}
     */
	public get $table_id(): number {
		return this.table_id;
	}

    /**
     * Getter $field_order
     * @return {string}
     */
	public get $field_order(): string {
		return this.field_order;
	}

    /**
     * Getter $delete_flag
     * @return {string}
     */
	public get $delete_flag(): string {
		return this.delete_flag;
	}

    /**
     * Getter $created_by
     * @return {string}
     */
	public get $created_by(): string {
		return this.created_by;
	}

    /**
     * Getter $created_on
     * @return {Date}
     */
	public get $created_on(): Date {
		return this.created_on;
	}

    /**
     * Getter $updated_by
     * @return {string}
     */
	public get $updated_by(): string {
		return this.updated_by;
	}

    /**
     * Getter $updated_on
     * @return {Date}
     */
	public get $updated_on(): Date {
		return this.updated_on;
	}

    /**
     * Setter $field_id
     * @param {number} value
     */
	public set $field_id(value: number) {
		this.field_id = value;
	}

    /**
     * Setter $field_name
     * @param {string} value
     */
	public set $field_name(value: string) {
		this.field_name = value;
	}

    /**
     * Setter $field_name_api
     * @param {string} value
     */
	public set $field_name_api(value: string) {
		this.field_name_api = value;
	}

    /**
     * Setter $field_name_db
     * @param {string} value
     */
	public set $field_name_db(value: string) {
		this.field_name_db = value;
	}

    /**
     * Setter $field_data_type
     * @param {string} value
     */
	public set $field_data_type(value: string) {
		this.field_data_type = value;
	}

    /**
     * Setter $table_name
     * @param {string} value
     */
	public set $table_id(value: number) {
		this.table_id = value;
	}

    /**
     * Setter $field_order
     * @param {string} value
     */
	public set $field_order(value: string) {
		this.field_order = value;
	}

    /**
     * Setter $delete_flag
     * @param {string} value
     */
	public set $delete_flag(value: string) {
		this.delete_flag = value;
	}

    /**
     * Setter $created_by
     * @param {string} value
     */
	public set $created_by(value: string) {
		this.created_by = value;
	}

    /**
     * Setter $created_on
     * @param {Date} value
     */
	public set $created_on(value: Date) {
		this.created_on = value;
	}

    /**
     * Setter $updated_by
     * @param {string} value
     */
	public set $updated_by(value: string) {
		this.updated_by = value;
	}

    /**
     * Setter $updated_on
     * @param {Date} value
     */
	public set $updated_on(value: Date) {
		this.updated_on = value;
	}

}