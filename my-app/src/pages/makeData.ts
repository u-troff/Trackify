import type { TimeEntry } from './TimeTracking'; // Adjust the import path if needed
import { useQuery } from '@tanstack/react-query';
import { GetSpecificTimeEntry, GetTimeEntry } from '../services/ApiCalls';
import { GetProjects } from '../services/ApiCalls';
import { useMemo } from 'react';


interface ProjectProps{
    name:string;
    description:string;
    time_spent?:number;
    ProjectId?:string;
}

//function to update table with projects
export function Data(projectId?:string,userId:string, loading:boolean) {
  //this if statement is for all projects
  const { data: projects =[]} = useQuery({
    queryKey: ['projects',userId],
    queryFn: async () => GetProjects(userId!),
  });

  // const filteredProject = projects.filter((p)=>{
  //   return p.ProjectId === projectId
  // })
  //console.log(projectId);
  if(projectId==="1")
  {
  const {data:timeEntries=[],isLoading:isTimeEntriesLoading} = useQuery({
    queryKey: ['time-entries/user/',userId],
    queryFn: ()=>GetTimeEntry(userId!),
  })
  const currentTblData: TimeEntry[]= useMemo(()=>{
  const projectMap = new Map(projects.map((p)=>[p.ProjectId,p.name]));

  const formattedTime:TimeEntry[] = timeEntries.map((entry)=>{
    const formattedDate = new Date(entry.date).toISOString().split("T")[0];
    
    const projectName = projectMap.get(entry.projectId)||entry.projectId;

    const duration = `${entry.hours}h ${entry.minutes}m`

    return{
      date:formattedDate,
      project:projectName,
      notes:entry.notes,
      duration:duration,
      action:"",
    }
  
  });
  return formattedTime;
  },[timeEntries,projects]);
  return currentTblData;
}else{
  
  const {data:timeEntries=[]} = useQuery({
    queryKey: ['time-entries/project/',projectId],
    queryFn: ()=>GetSpecificTimeEntry(projectId!),
  })
  const currentTblData: TimeEntry[]= useMemo(()=>{
  const projectMap = new Map(projects.map((p)=>[p.ProjectId,p.name]));

  const formattedTime:TimeEntry[] = timeEntries.map((entry)=>{
    const formattedDate = new Date(entry.date).toISOString().split("T")[0];
    
    const projectName = projectMap.get(entry.projectId)||entry.projectId;

    const duration = `${entry.hours}h ${entry.minutes}m`

    return{
      date:formattedDate,
      project:projectName,
      notes:entry.notes,
      duration:duration,
      action:"",
    }
  
  });
  return formattedTime;
  },[timeEntries,projects]);
  
  
  return currentTblData;
}
 
}




// export const data: TimeEntry[] = [
//   {
//     date: '2025-07-01',
//     project: 'Project Alpha',
//     notes: 'Worked on frontend UI components',
//     duration: '2h 30m',
//     action: '', // Action is rendered as an IconButton, so this can be empty
//   },
//   {
//     date: '2025-07-02',
//     project: 'Project Beta',
//     notes: 'Database optimization tasks',
//     duration: '3h 15m',
//     action: '',
//   },
//   {
//     date: '2025-07-03',
//     project: 'Project Gamma',
//     notes: 'Implemented authentication module',
//     duration: '4h 00m',
//     action: '',
//   },
//   {
//     date: '2025-07-04',
//     project: 'Project Alpha',
//     notes: 'Fixed bugs in payment system',
//     duration: '1h 45m',
//     action: '',
//   },
//   {
//     date: '2025-07-05',
//     project: 'Project Delta',
//     notes: 'Designed database schema',
//     duration: '3h 30m',
//     action: '',
//   },
//   {
//     date: '2025-07-06',
//     project: 'Project Beta',
//     notes: 'Code review for team',
//     duration: '2h 00m',
//     action: '',
//   },
//   {
//     date: '2025-07-07',
//     project: 'Project Epsilon',
//     notes: 'Set up CI/CD pipeline',
//     duration: '5h 15m',
//     action: '',
//   },
//   {
//     date: '2025-07-08',
//     project: 'Project Alpha',
//     notes: 'Updated API endpoints',
//     duration: '2h 20m',
//     action: '',
//   },
//   {
//     date: '2025-07-09',
//     project: 'Project Gamma',
//     notes: 'Prepared user testing scripts',
//     duration: '1h 30m',
//     action: '',
//   },
//   {
//     date: '2025-07-10',
//     project: 'Project Delta',
//     notes: 'Integrated third-party API',
//     duration: '4h 45m',
//     action: '',
//   },
//   {
//     date: '2025-07-11',
//     project: 'Project Beta',
//     notes: 'Optimized frontend performance',
//     duration: '3h 00m',
//     action: '',
//   },
//   {
//     date: '2025-07-12',
//     project: 'Project Epsilon',
//     notes: 'Conducted team meeting',
//     duration: '1h 15m',
//     action: '',
//   },
// ];
