import { Box, Typography } from "@mui/material";
import BasicTextInput from "./BasicTextInput";
import { ResultType } from "../App";

function Results({
  monthlyMortgage,
  yearlyMortgage,
  monthlyInterest,
  yearlyInterest,
  monthlyHouse,
  yearlyHouse,
  balancePaid,
  interestPaid,
  totalPaid,
  yearlyAppreciation,
  totalAppreciation,
}: {
  monthlyMortgage: number;
  monthlyInterest: number;
  monthlyHouse: number;
} & ResultType) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="caption">House Payments</Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BasicTextInput
          label="Total Monthly House Payments"
          value={String(monthlyHouse)}
        />
        <BasicTextInput
          label="Total Yearly House Payments"
          value={String(yearlyHouse)}
        />
      </Box>
      <Typography variant="caption">Interest Payments</Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BasicTextInput
          label="Total Monthly Interest Payments"
          value={String(monthlyInterest)}
        />
        <BasicTextInput
          label="Total Yearly Interest Payments"
          value={String(yearlyInterest)}
        />
      </Box>
      <Typography variant="caption">Total Mortgage Payments</Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BasicTextInput
          label="Total Monthly Mortgage Payments"
          value={String(monthlyMortgage)}
        />
        <BasicTextInput
          label="Total Yearly Mortgage Payments"
          value={String(yearlyMortgage)}
        />
      </Box>
      <Typography variant="caption">Totals</Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <BasicTextInput
          label="Total Paid In Interest"
          value={String(interestPaid)}
        />
        <BasicTextInput
          label="Total Balance Paid On House"
          value={String(balancePaid)}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <BasicTextInput label="Total Paid" value={String(totalPaid)} />
      </Box>
      <Typography variant="caption">Appreciation</Typography>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <BasicTextInput
          label="Yearly Appreciation"
          value={String(yearlyAppreciation)}
        />
        <BasicTextInput
          label="Total Appreciation"
          value={String(totalAppreciation)}
        />
      </Box>
    </Box>
  );
}

export default Results;
