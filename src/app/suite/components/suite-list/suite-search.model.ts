export class SuiteSearch
{
    constructor(
        private suiteId: string,
        private suiteName: string,
        private CreatedBy: string[],
        private createdDateFrom: Date,
        private createdDateTo: Date
    )
    {}
}