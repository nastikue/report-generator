import {InputElement} from "@/components/InputElement";
import {IReport} from "@/typings/report";
import Link from "next/link";
import {ChangeEvent,useState} from "react";
enum Stage {
  TitlePage,
  InfoPage,
  RolePage,
  Additions
}

const GeneratorPage=() => {
  const [stage,setStage]=useState(Stage.TitlePage);
  const [report,setReport]=useState('');
  const [reportData,setReportData]=useState({} as IReport);

  const handleReportChange=(event: ChangeEvent<HTMLInputElement>) => {
    const {name,value}=event.target;
    if(name) {
      setReportData((prevData) => ({...prevData,[name]: value}));
    }
  };
  const handleMentorNameChange=(event: ChangeEvent<HTMLInputElement>) => {
    const {name,value}=event.target;
    if(name) {
      const newReportData={...reportData};
      const prevMentor={...(newReportData.mentor||{})};
      setReportData({
        ...newReportData,
        mentor: {
          ...prevMentor,
          [name]: value
        }
      });
    }
  };
  const handleTechnologyChange=(event: ChangeEvent<HTMLInputElement>) => {
    const {name,value}=event.target;
    if(name) {
      const keys=name.split('_');
      const newReportData={...reportData};
      const prevTechnologies={...(newReportData?.technologies||{})};
      newReportData['technologies']={
        ...prevTechnologies,
        [keys[0] as string]: {
          ...prevTechnologies[keys[0] as string],
          [keys[1] as string]: value
        }

      }
      setReportData(newReportData);
    }
  };
  const handleRoleDescriptionChange=(event: ChangeEvent<HTMLInputElement>) => {
    const {name,value}=event.target;
    if(name) {
      const keys=name.split('_');
      const newReportData={...reportData};
      const prevDescription={...(newReportData?.rolesDescription||{})};
      newReportData['rolesDescription']={
        ...prevDescription,
        [keys[0] as string]: {
          ...prevDescription[keys[0] as string],
          [keys[1] as string]: value
        }

      }
      setReportData(newReportData);
    }
  };
  console.log({stage});


  const handleSubmit=() => {
    const projectName=reportData.projectName;
    const mentor=reportData.mentor;
    console.log(projectName);

    const reportText=`${projectName}
    Roles:
    ${mentor? 'Mentor: '+`${mentor.firstName} ${mentor.secondName}`+'\n':''}`
    console.log(reportText);
    setReport(reportText);
    setStage(Stage.InfoPage);

  }
  console.log(report);

  return <div>
    <h1>Report generator</h1>
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      {stage===Stage.TitlePage&&<form onSubmit={handleSubmit}>
        <h1>Title</h1>
        <InputElement name="projectName" placeholder="Project Name" onInputChange={handleReportChange} />
        <p>Mentor:</p>
        <InputElement name="firstName" placeholder="Mentor Name" onInputChange={handleMentorNameChange} />
        <InputElement name="secondName" placeholder="Mentor Surname" onInputChange={handleMentorNameChange} />
        <button type='submit'>Next</button>
      </form>}
      {stage===Stage.InfoPage&&<form>
        <h1>Info</h1>
        <InputElement type="url" name="repository" placeholder="Repository link" onInputChange={handleReportChange} />
        <InputElement type="url" name="design" placeholder="Design link" onInputChange={handleReportChange} />
        <InputElement type="url" name="jira" placeholder="JIRA link" onInputChange={handleReportChange} />
        <InputElement type="url" name="sprintsReports" placeholder="Link to Sprints Report" onInputChange={handleReportChange} />
        <InputElement type="url" name="app" placeholder="Link to Web App" onInputChange={handleReportChange} />
        <InputElement name="shortProjectDescription" placeholder="Short Project Description" onInputChange={handleReportChange} />
        <InputElement name="introduction" placeholder="Introduction" onInputChange={handleReportChange} />
        <div className="buttons-container">
          <button onClick={() => setStage(Stage.TitlePage)}>{'<'}- Back</button>
          <button onClick={() => setStage(Stage.RolePage)}>Next -{'>'}</button>
        </div>
      </form>}
      {stage===Stage.RolePage&&<form>
        <h1>Role responsibilities</h1>
        <div className="buttons-container">
          <button onClick={() => setStage(Stage.InfoPage)}>{'<'}- Back</button>
          <button onClick={() => setStage(Stage.RolePage)}>+ Add Another Role</button>
          <button onClick={() => setStage(Stage.Additions)}>Next -{'>'}</button>
        </div>
      </form>}
      {stage===Stage.Additions&&<form>
        <h1>Additions</h1>
        <div className="buttons-container">
          <button onClick={() => setStage(Stage.RolePage)}>{'<'}- Back</button>
      <Link
            href="/result"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Generate{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Please check all fields before clicking!
            </p>
          </Link>
        </div>
      </form>}


    </div>
  </div>
};

export default GeneratorPage;