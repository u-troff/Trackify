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
  Skeleton
} from "@mui/material";

import Sidebar from "./SideBar";
import { GetProjects, GetTimeEntry, PostTimeEntry, type TimeSchema ,GetSpecificTimeEntry,UpdateTimeEntry} from "../services/ApiCalls";
import { auth } from "../services/firebase";
import NewManualTimeEntry from "../Components/NewManualTimeEntry"
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import type {Props} from '../Components/Projects'
import BasicDatePicker from "../Components/DatePicker"
import Project from "../Components/Projects";
import { Spinner } from "../Spinner/Spinner";
import dayjs,{Dayjs} from  'dayjs'
import { useNavigate ,useLocation} from "react-router";
import queryString from "query-string"
import { ResponsiveDialog } from "../Components/handleEditAndDelete";
import EditEntry from "../Components/EditTime"
export interface TimeEntry{
  id:string;
  date: string;
  project: string;
  notes: string;
  duration:string;
  action:string;
}

export interface Patch {
  project: string;
  notes: string;
  hours: number;
  minutes: number;
  timeId: string;
}



interface TimeTrackProps{
  path:string;
}

export function TotalHours(timeEntry:TimeEntry[]){
  let Total = 0;
  const parseTimeToMinutes = (timeStr:string)=>{
    const match = timeStr.match(/(\d+)h\s*(\d+)m/)
    if (!match) return 0;

    const hours = parseInt(match[1],10);
    const minutes = parseInt(match[2],10);
    return hours*60+minutes;
  };

  const formatMinutesToTime = (totalMinutes:number)=>{
    const hours = Math.floor(totalMinutes/60);
    const minutes = totalMinutes%60;
    return `${hours}h ${minutes}m`;
  }

  for (let i = 0; i < timeEntry.length; i++) {
    const element = timeEntry[i].duration;
    Total  = Total+ parseTimeToMinutes(element);
  }
  return formatMinutesToTime(Total);
}


const TimeTracking: React.FC<TimeTrackProps>=(props)=>{
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();


  //useStates
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [DeleteTimeEntry,setDeleteTimeEntries] = useState<TimeEntry>({});
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDeleteDialog,setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog,setOpenEditDialog] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(()=>{
    const params = queryString.parse(location.search);
    return (params.projectId as string)||"1";
  });
  const [selected, setSelected] = useState<Dayjs | null>(dayjs());
  const [rowSelection, setRowSelection] = useState({});
  const [currentEdits,setCurrentEdits] = useState<TimeEntry>();
  const userId = auth.currentUser?.uid;

  const {
    data: projecs = [],
    error,
    isLoading: isProjectsLoading,
  } = useQuery<Props[]>({
    queryKey: ["projects", userId],
    queryFn: () => GetProjects(userId!),
    enabled: !!userId,
  });

  const { data: rawTimeEntries = [], isLoading: isTimeEntriesLoading } = useQuery({
    queryKey: ["time-entries/user/", userId],
    queryFn: () => GetTimeEntry(userId!),
  });


  const { data: SpecificTimeEntries = [],isLoading:isSpecificTimeEntriesLoading } = useQuery({
    queryKey: ["time-entries/project/", selectedProjectId],
    queryFn: () => GetSpecificTimeEntry(selectedProjectId!),
  });

  /*This is the Query calls to filter on the table and simplified it */
  const timeEntries: TimeEntry[] = useMemo(() => {
    if(selectedProjectId=="1"){
    const projectMap = new Map(projecs.map((p) => [p.ProjectId, p.name]));
    return rawTimeEntries.map((entry: any) => {
      const formattedDate = new Date(entry.date).toISOString().split("T")[0];
      const projectName = projectMap.get(entry.projectId) || entry.projectId;
      const duration = `${entry.hours}h ${entry.minutes}m`;

      return {
        id: entry.id, // Use the id from the raw data
        date: formattedDate,
        project: projectName,
        notes: entry.notes,
        duration: duration,
        action: "",
      };
    });
  }else{
    const projectMap = new Map(projecs.map((p) => [p.ProjectId, p.name]));
    return SpecificTimeEntries.map((entry: any) => {
      const formattedDate = new Date(entry.date).toISOString().split("T")[0];
      const projectName = projectMap.get(entry.projectId) || entry.projectId;
      const duration = `${entry.hours}h ${entry.minutes}m`;

      return {
        id: entry.id, // Use the id from the raw data
        date: formattedDate,
        project: projectName,
        notes: entry.notes,
        duration: duration,
        action: "",
      };
    });
  }
  }, [rawTimeEntries, projecs,SpecificTimeEntries]);
  //Getting the Total hours for a project
  const Total = TotalHours(timeEntries);

  useEffect(() => {
    if (selectedProjectId === "1") {
      navigate("/time-tracking");
      setShowFilters(false);
    }
  }, [selectedProjectId]);
  //Mutation to post time entries
  const mutation = useMutation({
    mutationFn: (values: {
      project: string;
      notes: string;
      hours: number;
      minutes: number;
    }) =>
      PostTimeEntry({
        projectId: values.project,
        userId: userId!,
        date: new Date().toLocaleDateString(),
        hours: values.hours,
        minutes: values.minutes,
        notes: values.notes,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["time-entries",userId,selectedProjectId],
        exact:false,
      });
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error(error);
    },
    onMutate: () => {
      setOpenDialog(false);
    },
  });

  //Mutation to update time entries
  // const timeMutations = useMutation({
  //   mutationFn: (updatedTimeEntry:Patch)=>UpdateTimeEntry({
  //     projectId:updatedTimeEntry.project,
  //     hours:updatedTimeEntry.hours,
  //     minutes:updatedTimeEntry.minutes,
  //     notes:updatedTimeEntry.notes,
  //   }),
  //   onSuccess:()=>{
  //     queryClient.invalidateQueries({
  //       queryKey: ["time-entries", userId, selectedProjectId],
  //       exact: false,
  //     });
  //   }
  // })
  
  //Delete Entries
  const handleDelete = (timeEntry: TimeEntry) => {
    setOpenDeleteDialog(true);
    setDeleteTimeEntries(timeEntry);
    //console.log(timeEntry);
  };
  //TotalHours(currentTblData);
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
      Cell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: 100,
          }}
        >
          <IconButton onClick={()=>OpenEditForm(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: timeEntries,
    getRowId:(row)=>row.id,//use id from each entry
    enableColumnFilters: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      showGlobalFilter: true,
      showColumnFilters: true,
    },
    //customize the MRT components
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15,20],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });


  //add time tracking
  const handleFormSubmit = (values: {
    project: string;
    notes: string;
    hours: number;
    minutes: number;
  }) => {
    mutation.mutate(values);
  };

  const OpenEditForm=(row:TimeEntry)=>{
    setOpenEditDialog(true);
    setCurrentEdits(row);
  }
  //console.log(currentEdits);

  const handleFormEdit = (values:Patch)=>{
    setOpenEditDialog(false);
    console.log("editing",values);
    UpdateTimeEntry(values.timeId,values);
  }

  const handleChange = (event: any) => {
    const newProjectId:string = event.target.value;
    setSelectedProjectId(event.target.value);
    navigate(`?projectId=${newProjectId}`);
    setShowFilters(newProjectId !== "1");
  };

  const searchedDate = selected?.toISOString().split("T")[0];

  useEffect(() => {
    if (showFilters) {
      table.setColumnFilters((prev) => [
        ...prev.filter((f) => f.id !== "date"), // Remove existing dates
        ...(searchedDate ? [{ id: "date", value: searchedDate }] : []),
      ]);
    } else {
      table.setColumnFilters((prev) => prev.filter((f) => f.id !== "date"));
    }
  }, [searchedDate, showFilters]);

  
  return (
    <>
      <Box sx={{ mt: 8}}>
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
            <BasicDatePicker selected={selected} setSelected={setSelected} />
            <MRT_TablePagination table={table} />
          </Box>
          {/* Using Vanilla Material-UI Table components here */}
          {isProjectsLoading ||
          isTimeEntriesLoading ||
          isSpecificTimeEntriesLoading ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100"
                  height={120}
                  sx={{ mb: 2 }}
                />
              </Box>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
                  {/* Use your own markup, customize however you want using the power of TanStack Table */}
                  <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableCell
                            align="center"
                            variant="head"
                            key={header.id}
                          >
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
                          <TableCell
                            align="center"
                            variant="body"
                            key={cell.id}
                          >
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
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                mt={2}
                p={2}
                bgcolor="inherit"
                borderTop="1px solid #ddd"
                borderRadius="0 0 8px 8px"
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Total Hours: {Total}
                </Typography>
              </Box>
            </>
          )}
        </Stack>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <NewManualTimeEntry
            onSubmit={handleFormSubmit}
            onCancel={() => setOpenDialog(false)}
          />
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <ResponsiveDialog
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            Id={DeleteTimeEntry.id}
          />
        </Dialog>
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <EditEntry
            onSubmit={handleFormEdit}
            onCancel={() => setOpenEditDialog(false)}
            TimeId={currentEdits}
          />
        </Dialog>
      </Box>
    </>
  );
}


export default TimeTracking;