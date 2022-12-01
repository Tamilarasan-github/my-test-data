import { TestScript } from "../testscripts/test-scripts";

export class Suite{
    constructor(
        public suiteId: number,
        public suiteName: string,
        public suiteDescription: string,
        public createdBy: string,
        public createdDate: Date,
        public updatedBy: string,
        public updatedDate: Date,
        )
    {}
}