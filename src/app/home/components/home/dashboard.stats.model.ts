import { EnvironmentExecutionStats } from "./dashboard-enviornments-execution-stats-model";
import { ITestDataStats } from "./dashboard-testdata-stats-model";

export class DashboardStats
{
    public testDataStats: ITestDataStats;
    public environmentExecutionStats:EnvironmentExecutionStats[];
        
    constructor()
    {
        this.testDataStats={
            totalTestcasesCreated: "0", 
            regressionTestcases: "0", 
            functionalTestcases: "0"
        };
        this.environmentExecutionStats=[];
    }
}