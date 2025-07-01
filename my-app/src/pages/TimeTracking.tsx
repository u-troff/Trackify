import React, { useEffect, useState ,useMemo} from "react"
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Sidebar from "./SideBar";
import { GetProjects, GetTimeEntry, PostTimeEntry, type TimeSchema } from "../services/ApiCalls";
import { auth } from "../services/firebase";
import NewManualTimeEntry from "../Components/NewManualTimeEntry"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import type {Props} from '../Components/Projects'
import BasicDatePicker from "../Components/DatePicker"
import Project from "../Components/Projects";
import { Spinner } from "../Spinner/Spinner";
import {Data} from "./makeData"
import dayjs,{Dayjs} from  'dayjs'

export interface TimeEntry{
  date: string;
  project: string;
  notes: string;
  duration:string;
  action:string;
}

const columns: MRT_ColumnDef<TimeEntry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    size: 100,
  },
  {
    accessorKey: "project",
    header: "Project",
    size: 150,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 200,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    size: 100,
  },
  {
    accessorKey: "action",
    header: "Action",
    size: 80,
    Cell: () => (
      <Box sx={{ display: "flex", justifyContent: "space-between",maxWidth:100 }}>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  },
];




const TimeTracking: React.FC=()=>{
  const [openDialog,setOpenDialog] = useState<boolean>(false);
  const [selectedProjectId,setSelectedProjectId] = useState<string>("1")
  //const [queryTimeEntries,setQueryTimeEntries] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Dayjs | null>(dayjs());
 // const [projectValues,setProjectValues] = useState({});
  const userId = auth.currentUser?.uid;
  const [canSelectDate,setCanSelectDate] = useState<boolean>(true);
  const {data:projecs=[],error,isLoading:isProjectsLoading}= useQuery<Props[]>({
    queryKey: ["projects",userId],
    queryFn: ()=>GetProjects(userId!),
    enabled:!!userId,
    staleTime:1*60*1000,
  })

  //getting drop down time entry
  
  const currentTblData = Data(selectedProjectId,userId);
  

  //Mutation to post time entries
  const mutation = useMutation({
    mutationFn:(values:{
      project:string;
      notes:string;
      hours:number;
      minutes:number;
    })=>
      PostTimeEntry({
        projectId:values.project,
        userId:userId!,
        date: new Date().toLocaleDateString(),
        hours:values.hours,
        minutes:values.minutes,
        notes:values.notes,
      }),

      onSuccess: ()=>{
        queryClient.invalidateQueries({queryKey:["time-entries"],exact:true});
        setOpenDialog(false);
        
      },
      onError: (error)=>{
        console.error(error);
      },
      onMutate:()=>{
        setOpenDialog(false);
      }
    
  })

  const table = useMaterialReactTable({
    columns,
    data:currentTblData,
    enableRowSelection: true,
    enableColumnFilters:true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      showColumnFilters:true,
    },
    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [10, 15, 20],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

 
  
  const handleFormSubmit = (values:{
    project:string;
    notes:string;
    hours:number;
    minutes:number;
  })=>{
    mutation.mutate(values);
    
  }
    

  const handleChange =(event:any)=>{
      setSelectedProjectId(event.target.value);
  }
  
    const searchedDate = selected?.toISOString().split("T")[0];
  
  useEffect(()=>{
      table.setColumnFilters((prev)=>[
        ...prev.filter((f)=>f.id !=="date"),// Remove existing dates
        ...(searchedDate?[{id:"date",value:searchedDate}]:[]),
      ])
  },[searchedDate])
  
  

  if (isProjectsLoading) return <Spinner />;
  return (
    <>
      <Sidebar id={2} />
      <Box sx={{ mt: 8, ml: "200px" }}>
        <Stack sx={{ m: "2rem 0" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Time Entry
            </Typography>
            <Button
              variant="contained"
              sx={{ color: "white", bgcolor: "black" }}
              onClick={() => setOpenDialog(true)}
            >
              Track Time
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/**
             * Use MRT components along side your own markup.
             * They just need the `table` instance passed as a prop to work!
             */}
            <MRT_GlobalFilterTextField table={table} />
            {/*<MRT_TablePagination table={table} />*/}
            <Select
              value={selectedProjectId}
              displayEmpty
              onChange={handleChange}
              renderValue={(selected) => {
                const item = projecs.find((p) => p.ProjectId === selected);
                return item ? item.name : "All Projects";
              }}
              sx={{ width: "auto" }}
            >
              <MenuItem value="1">All projects</MenuItem>
              {projecs.map((p) => (
                <MenuItem value={p.ProjectId}>{p.name}</MenuItem>
              ))}
              {
                //add a map function for all projects
              }
            </Select>
           <BasicDatePicker selected={selected} setSelected={setSelected} canSelect={canSelectDate}/>
          </Box>
          {/* Using Vanilla Material-UI Table components here */}
          <TableContainer>
            <Table>
              {/* Use your own markup, customize however you want using the power of TanStack Table */}
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell align="center" variant="head" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.Header ??
                                header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow key={row.id} selected={row.getIsSelected()}>
                    {row.getVisibleCells().map((cell, _columnIndex) => (
                      <TableCell align="center" variant="body" key={cell.id}>
                        {/* Use MRT's cell renderer that provides better logic than flexRender */}
                        <MRT_TableBodyCellValue
                          cell={cell}
                          table={table}
                          staticRowIndex={rowIndex} //just for batch row selection to work
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Stack>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <NewManualTimeEntry
            onSubmit={handleFormSubmit}
            onCancel={() => setOpenDialog(false)}
          />
        </Dialog>
      </Box>
    </>
  );
}


export default TimeTracking;