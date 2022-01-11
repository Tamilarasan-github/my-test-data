import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Groups } from './groups';
import { TestScriptData } from './test-script-data';

@Component({
  selector: 'app-my-test-scripts',
  templateUrl: './my-test-scripts.component.html',
  styleUrls: ['./my-test-scripts.component.css']
})
export class MyTestScriptsComponent implements OnInit {

  editEnabledIndex: number = 0;
  showAddTestscript: boolean = false;
  listOfAllTestScripts: number[] = [];
  listOfTestScriptsToExecute: number[] = [];
  testScriptDetailsUpdate: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();
  testScriptDetailsBackup: Map<number, Map<String, String>> = new Map<number, Map<String, String>>();

  @ViewChild('newTestScriptName')
  newTestScriptName!: ElementRef<HTMLInputElement>;
  @ViewChild('newTestScriptDescription')
  newTestScriptDescription!: ElementRef<HTMLInputElement>;


  groupsList: Groups[] = [
    new Groups("Smoke"),
    new Groups("Sanity"),
    new Groups("Regression"),
    new Groups("Integration"),
    new Groups("End to End"),
    new Groups("Dev"),
    new Groups("SIT"),
    new Groups('Tamil-1'),
    new Groups('Tamil-2'),
    new Groups('Tamil-3'),
    new Groups('Tamil-4'),
    new Groups('Tamil-5'),
    new Groups('Tamil-6'),
    new Groups('Tamil-7'),
    new Groups('Tamil-8'),
    new Groups('Tamil-9'),
    new Groups('Tamil-10'),
    new Groups('Tamil-11'),
    new Groups('Tamil-12'),
    new Groups('Tamil-13'),
    new Groups('Tamil-14'),
    new Groups('Tamil-15'),
    new Groups('Tamil-16'),
    new Groups('Tamil-17'),
    new Groups('Tamil-18'),
    new Groups('Tamil-19'),
    new Groups('Tamil-20'),
    new Groups('Tamil-21'),
    new Groups('Tamil-22'),
    new Groups('Tamil-23'),
    new Groups('Tamil-24'),
    new Groups('Tamil-25'),
    new Groups('Tamil-26'),
    new Groups('Tamil-27'),
    new Groups('Tamil-28'),
    new Groups('Tamil-29'),
    new Groups('Tamil-30'),
    new Groups('Tamil-31'),
    new Groups('Tamil-32'),
    new Groups('Tamil-33'),
    new Groups('Tamil-34'),
    new Groups('Tamil-35'),
    new Groups('Tamil-36'),
    new Groups('Tamil-37'),
    new Groups('Tamil-38'),
    new Groups('Tamil-39'),
    new Groups('Tamil-40'),
    new Groups('Tamil-41'),
    new Groups('Tamil-42'),
    new Groups('Tamil-43'),
    new Groups('Tamil-44'),
    new Groups('Tamil-45'),
    new Groups('Tamil-46'),
    new Groups('Tamil-47'),
    new Groups('Tamil-48'),
    new Groups('Tamil-49'),
    new Groups('Tamil-50'),
    new Groups('Tamil-51'),
    new Groups('Tamil-52'),
    new Groups('Tamil-53'),
    new Groups('Tamil-54'),
    new Groups('Tamil-55'),
    new Groups('Tamil-56'),
    new Groups('Tamil-57'),
    new Groups('Tamil-58'),
    new Groups('Tamil-59'),
    new Groups('Tamil-60'),
    new Groups('Tamil-61'),
    new Groups('Tamil-62'),
    new Groups('Tamil-63'),
    new Groups('Tamil-64'),
    new Groups('Tamil-65'),
    new Groups('Tamil-66'),
    new Groups('Tamil-67'),
    new Groups('Tamil-68'),
    new Groups('Tamil-69'),
    new Groups('Tamil-70'),
    new Groups('Tamil-71'),
    new Groups('Tamil-72'),
    new Groups('Tamil-73'),
    new Groups('Tamil-74'),
    new Groups('Tamil-75'),
    new Groups('Tamil-76'),
    new Groups('Tamil-77'),
    new Groups('Tamil-78'),
    new Groups('Tamil-79'),
    new Groups('Tamil-80'),
    new Groups('Tamil-81'),
    new Groups('Tamil-82'),
    new Groups('Tamil-83'),
    new Groups('Tamil-84'),
    new Groups('Tamil-85'),
    new Groups('Tamil-86'),
    new Groups('Tamil-87'),
    new Groups('Tamil-88'),
    new Groups('Tamil-89'),
    new Groups('Tamil-90'),
    new Groups('Tamil-91'),
    new Groups('Tamil-92'),
    new Groups('Tamil-93'),
    new Groups('Tamil-94'),
    new Groups('Tamil-95'),
    new Groups('Tamil-96'),
    new Groups('Tamil-97'),
    new Groups('Tamil-98'),
    new Groups('Tamil-99'),
    new Groups('Tamil-100')

  ];

  testScriptList: TestScriptData[] =
    [
      new TestScriptData(1001, 'T001_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1002, 'T002_Testscript', 'This test script validates end to end flow, regression flow, unit test, smoke test'),
      new TestScriptData(1003, 'T003_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1004, 'T004_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1005, 'T005_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1006, 'T006_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1007, 'T007_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1008, 'T008_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1009, 'T009_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1010, 'T010_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1011, 'T011_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1012, 'T012_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1013, 'T013_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1014, 'T014_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1015, 'T015_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1016, 'T016_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1017, 'T017_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1018, 'T018_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1019, 'T019_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1020, 'T020_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1021, 'T021_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1022, 'T022_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1023, 'T023_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1024, 'T024_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1025, 'T025_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1026, 'T026_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1027, 'T027_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1028, 'T028_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1029, 'T029_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1030, 'T030_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1031, 'T031_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1032, 'T032_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1033, 'T033_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1034, 'T034_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1035, 'T035_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1036, 'T036_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1037, 'T037_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1038, 'T038_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1039, 'T039_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1040, 'T040_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1041, 'T041_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1042, 'T042_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1043, 'T043_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1044, 'T044_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1045, 'T045_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1046, 'T046_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1047, 'T047_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1048, 'T048_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1049, 'T049_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1050, 'T050_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1051, 'T051_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1052, 'T052_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1053, 'T053_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1054, 'T054_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1055, 'T055_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1056, 'T056_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1057, 'T057_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1058, 'T058_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1059, 'T059_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1060, 'T060_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1061, 'T061_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1062, 'T062_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1063, 'T063_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1064, 'T064_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1065, 'T065_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1066, 'T066_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1067, 'T067_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1068, 'T068_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1069, 'T069_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1070, 'T070_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1071, 'T071_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1072, 'T072_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1073, 'T073_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1074, 'T074_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1075, 'T075_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1076, 'T076_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1077, 'T077_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1078, 'T078_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1079, 'T079_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1080, 'T080_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1081, 'T081_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1082, 'T082_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1083, 'T083_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1084, 'T084_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1085, 'T085_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1086, 'T086_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1087, 'T087_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1088, 'T088_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1089, 'T089_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1090, 'T090_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1091, 'T091_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1092, 'T092_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1093, 'T093_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1094, 'T094_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1095, 'T095_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1096, 'T096_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1097, 'T097_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1098, 'T098_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1099, 'T099_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1100, 'T100_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1101, 'T101_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1102, 'T102_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1103, 'T103_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1104, 'T104_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1105, 'T105_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1106, 'T106_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1107, 'T107_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1108, 'T108_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1109, 'T109_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1110, 'T110_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1111, 'T111_Testscript', 'This test script validates smoke flow'),
      new TestScriptData(1112, 'T112_Testscript', 'This test script validates high-level flow'),
      new TestScriptData(1113, 'T113_Testscript', 'This test script validates end to end flow'),
      new TestScriptData(1114, 'T114_Testscript', 'This test script validates smoke flow'),

    ];

  constructor() {

  }

  ngOnInit(): void {
  }

  enableSaveAndCancel(e: Event, index: number) {
    this.editEnabledIndex = index;
  }

  enableEditAndDelete(event: Event, testScriptId: number) {
    this.editEnabledIndex = 0;
    console.log(this.testScriptDetailsBackup.get(testScriptId));
  }

  backupExistingValue(event: any, index: number, element:HTMLTextAreaElement) {
    const testScriptDetailsUpdatesTemp: Map<String, String> = new Map<String, String>();
    testScriptDetailsUpdatesTemp.set(element.name, element.value);
    this.testScriptDetailsBackup.set(index, testScriptDetailsUpdatesTemp);
    console.log(this.testScriptDetailsBackup);
  }

  fetchExistingValue(index: number, existingValue: string) {
    if (this.testScriptDetailsBackup.get(index) != null) {

    };
  }

  eventCheck(event: any, index: number) {
    if (event.target.checked) {
      this.listOfTestScriptsToExecute.push(index);
      console.log(this.listOfTestScriptsToExecute);
    }
    else {
      this.listOfTestScriptsToExecute.forEach((elementInArray, indexOdElementInArray) => {
        if (elementInArray == index) {
          this.listOfTestScriptsToExecute.splice(indexOdElementInArray, 1);
          console.log(this.listOfTestScriptsToExecute);
        }
      });

    }
  }

  selectAllCheckboxes(event: any) {
    if (event.target.checked) {

    }
    else {

    }

  }

  onCancel(event: any) {

  }

  enableNewTestscriptRow(event: any) {
    this.showAddTestscript = true;
  }

  cancelNewTestscriptRow(event: any) {
    this.showAddTestscript = false;
  }

  saveNewTestscriptDetails(event: any) {
    console.log(new TestScripts(0, this.newTestScriptName.nativeElement.value, this.newTestScriptDescription.nativeElement.value));
    this.showAddTestscript = false;
  }

  updateExistingTestscriptDetails(event: Event, testScriptId: number) {

    console.log('updateExistingTestscriptDetails');
    console.log(this.testScriptDetailsUpdate.get(testScriptId));
    this.enableEditAndDelete(event, testScriptId);
  }


updateExistingTestscriptFieldDetails(event: Event, testScriptId: number, element:HTMLTextAreaElement) {

    console.log('updateExistingTestscriptDetails');
    console.log(this.testScriptDetailsUpdate.get(testScriptId));
    this.enableEditAndDelete(event, testScriptId);
  }
}

export class TestScripts {
  constructor(public testScriptId: number, public testScriptName: String, public testScriptDescription: String) {
    console.log(testScriptName);
    console.log(testScriptDescription);
  }
}



