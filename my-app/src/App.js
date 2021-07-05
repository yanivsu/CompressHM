import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  loadInitData,
  addLineData,
  askForCompressTransactions,
} from "./actions/compressAction";
import TableComponent from "./components/tableComponent";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    padding: theme.spacing(2),
    fontWeight: "Bold",
    textAlign: "center",
    color: "whitesmoke",
    background: "#3f51b5",
  },
  loading: {
    marginLeft: "50vw",
    marginTop: "50vh",
  },
}));
function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState();
  const [transactionName, setTransactionName] = useState("");

  const compressDataSelector = useSelector((state) => state.compressReducer);
  const dispatcher = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCloseOk = () => {
    if (transactionName === "") {
      alert("You must add a name for transatcion first.");
    } else {
      if (transactionAmount > 0 || transactionAmount < 0) {
        let payload = {
          name: transactionName,
          amount: transactionAmount,
        };
        dispatcher(addLineData(payload));
      } else {
        alert("0 is invalid number");
      }
    }
  };

  const handleCompressTransactions = () => {
    dispatcher(askForCompressTransactions());
  };

  useEffect(() => {
    // Fetch Data
    dispatcher(loadInitData());
  }, []);

  useEffect(() => {
    if (!compressDataSelector.newLineLoading) {
      setOpen(false);
    }
  }, [compressDataSelector.newLineLoading]);

  if (!compressDataSelector.isLoading) {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography className={classes.header}>Paying</Typography>
            <TableComponent data={compressDataSelector.compressData[0]} />
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.header}>Receiving</Typography>
            <TableComponent data={compressDataSelector.compressData[1]} />
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="baseline"
            direction="row"
            spacing={6}
          >
            <Grid xs={3}>
              <Button
                onClick={() => handleClickOpen()}
                variant="contained"
                color="primary"
              >
                Add new Transaction
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={handleCompressTransactions}
                variant="contained"
                color="primary"
              >
                Compress Transactions
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="Name"
              fullWidth
              onChange={(e) => {
                setTransactionName(e.target.value);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="amount"
              type="number"
              value={transactionAmount}
              fullWidth
              onChange={(e) => {
                setTransactionAmount(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              ❌ Cancel
            </Button>
            <Button onClick={handleCloseOk} color="primary">
              {compressDataSelector.newLineLoading ? "Loading..." : "✅ OK"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return <CircularProgress className={classes.loading} />;
  }
}

export default App;
