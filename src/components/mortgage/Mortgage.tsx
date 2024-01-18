import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import YearsDropDown from "./YearsDropDown";
import MoneyInput from "./MoneyInput";
import Results from "./Results";
import PercentageInput from "./PercentageInput";
import Appreciation from "./Appreciation";

const INTEREST_RATE = 6.625;
const ESTIMATED_APPRECIATION_VALUE = 3.5;

export type ResultType = {
  yearlyMortgage: number;
  yearlyInterest: number;
  yearlyHouse: number;
  balancePaid: number;
  interestPaid: number;
  totalPaid: number;
  yearlyAppreciation: number;
  totalAppreciation: number;
}

const borderStyle = {
  borderRadius: "10px",
  border: 1,
  borderColor: "#FF0000",
  p: 1,
};

function Mortgage() {
  const [yearsToPayOff, setYearsToPayOff] = useState<number>(20);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [appreciation, setAppreciation] = useState<number>(ESTIMATED_APPRECIATION_VALUE);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const genRows = () => {
    const rows = [];
    const annualPercentageToHome = loanAmount / yearsToPayOff;
    let interestPaid = 0;
    let totalAppreciation = 0;
    for (let year = 1; year <= yearsToPayOff; year++) {
      const yearlyHouse = Math.round(annualPercentageToHome);
      const balanceDue = Math.round(loanAmount - annualPercentageToHome * year);
      const yearlyInterest = Math.round(INTEREST_RATE/100 * (balanceDue+yearlyHouse));
      const yearlyMortgage = Math.round(yearlyInterest + yearlyHouse);
      interestPaid += yearlyInterest;
      const balancePaid = loanAmount - balanceDue;
      const totalPaid = annualPercentageToHome * year + interestPaid;
      const yearlyAppreciation = appreciation/100 * (loanAmount + totalAppreciation);
      totalAppreciation += yearlyAppreciation;
      rows.push({
        yearlyMortgage,
        yearlyInterest,
        yearlyHouse,
        balancePaid,
        interestPaid,
        totalPaid,
        yearlyAppreciation,
        totalAppreciation
      });
    }
    setResults(rows);
  };

  useEffect(() => {
    setError(false);
    if (
      typeof yearsToPayOff === "number" &&
      typeof loanAmount === "number" &&
      loanAmount >= 0
    ) {
      genRows();
    } else {
      setError(true);
    }
  }, [yearsToPayOff, loanAmount, appreciation]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={[
          {textAlign: "center", p: "9px" },
          error && borderStyle,
        ]}
      >
        <Typography sx={{ m: 4 }}>Mortgage Calc</Typography>
        <MoneyInput
          label="Loan Amount"
          value={loanAmount}
          setValue={setLoanAmount}
        />
        <PercentageInput value={String(INTEREST_RATE)} />
        <Appreciation value={String(appreciation)} setValue={setAppreciation}/>
        <YearsDropDown
          yearsToPayOff={yearsToPayOff}
          setYearsToPayOff={setYearsToPayOff}
        />
        <Divider sx={{ m: 5 }} />
        {results.map(
          (result: ResultType, index:number) => (
            <>
              <Typography sx={{ m: 1 }}>Year {index+1}</Typography>
              <Results
                monthlyMortgage={Math.round(result.yearlyMortgage / 12)}
                yearlyMortgage={result.yearlyMortgage}
                monthlyInterest={Math.round(result.yearlyInterest / 12)}
                yearlyInterest={result.yearlyInterest}
                monthlyHouse={Math.round(result.yearlyHouse / 12)}
                yearlyHouse={result.yearlyHouse}
                balancePaid={result.balancePaid}
                interestPaid={result.interestPaid}
                totalPaid={Math.round(result.totalPaid)}
                yearlyAppreciation={Math.round(result.yearlyAppreciation)}
                totalAppreciation={Math.round(result.totalAppreciation)}
              />
            </>
          )
        )}
      </Box>
    </Box>
  );
}

export default Mortgage;
