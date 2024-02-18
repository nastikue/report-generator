import {IReport} from "@/typings/report"

export const GeneratedReport=({report}: {report: IReport}) => {
  console.log(report);
  return <div>{report.projectName}</div>

}