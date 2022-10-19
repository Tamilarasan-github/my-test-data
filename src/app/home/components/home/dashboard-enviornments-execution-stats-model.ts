export class EnvironmentExecutionStats {
  public environmentName: string;
  public totalTestcasesExecuted: string;
  public testcasesPassed: string;
  public testcasesFailed: string;
  public testcasesNoResults: string;

  constructor() {
    this.environmentName="";
    this.totalTestcasesExecuted="";
    this.testcasesPassed="";
    this.testcasesFailed="";
    this.testcasesNoResults="";
  }
}
