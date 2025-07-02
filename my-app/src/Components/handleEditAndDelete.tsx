import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { TimeEntry } from "../pages/TimeTracking";
import { useQueryClient, useMutation ,useQuery} from "@tanstack/react-query";
import { GetTimeEntry, DeleteTimeEntry } from "../services/ApiCalls";


interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  timeEntry: TimeEntry;
}

function ResponsiveDialog(props: Props) {
  const { data: timeEntries = [] } = useQuery({
    queryKey: ["time-entries/project/", props.userId],
    queryFn: () => GetTimeEntry(props.userId!),
  });
  //console.log(timeEntries)
  //console.log(props.timeEntry)
  const queryClient = useQueryClient();
  //getting minutes
  const getminutes = props.timeEntry.duration;
  const match = getminutes.match(/(\d+)h\s*(\d+)m/);

  const minutes = parseInt(match[2], 10);
  //console.log(minutes);

  //getting the specific entry
  const timeentry = timeEntries.find(
    (t) => t.notes === props.timeEntry.notes && t.minutes === minutes
  );

   const TimeEntryid:string = timeentry.id;
   console.log(timeentry);
   console.log(TimeEntryid);
  
  const deletEntry = useMutation({
    mutationFn: (id: string) => DeleteTimeEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["time-entries"]);
      props.setOpen(false);
    },
    onError:()=>{
        console.log("Error occured");
    },
  });
  const handleSubmit = () => {
    deletEntry.mutate(TimeEntryid);
  };

  return (
    <>
      <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: "bold" }}>
        {"Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to Delete this Project's Entry: {
            timeentry.notes
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => props.setOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          autoFocus
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
}

export { ResponsiveDialog };
