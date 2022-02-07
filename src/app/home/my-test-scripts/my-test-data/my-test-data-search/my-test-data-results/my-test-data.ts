export class TestData {
    constructor(
        public test_data_id: number,
        public test_case_id: string,
        public run_flag: string,
        public test_scenario: string,
        public test_case_category: string,
        public test_script_name: string,
        public jira_id: string,
        public test_execution_time: string,
        public test_data_role: string,
        public test_data_parent_id: number,
        public created_by: string,
        public created_date: string,
        public updated_by: string,
        public updated_date: string,
        public column1: string,
        public column2: string,
        public column3: string,
        public column4: string,
        public column5: string,

    ) {

    }
}