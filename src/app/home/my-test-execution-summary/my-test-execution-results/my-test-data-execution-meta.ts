
import { TestDataExecution } from "./my-test-data-execution";

export class TestDataExecutionMeta {
    constructor(
        public test_execution_id: number,
        public test_data_meta_id: number,
        public test_case_id: string,
        public test_script_name: string,
        public run_flag: string,
        public test_scenario: string,
        public test_priority: number,
        public test_case_category: string,
        public jira_id: string,
        public automated_test_status: string,
        public manual_test_status: string,
        public test_fail_reason: string,
        public test_information: string,
        public test_comments: string,
        public test_ignored: string,
        public execution_status: string,
        public execution_time: string,
        public executed_by: string,
        public executed_on: string,
        public updated_by: string,
        public updated_date: string,
        public delete_flag: string,
        public test_data_execution: TestDataExecution[]
    ) 
    {

    }
}