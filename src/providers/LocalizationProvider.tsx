"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="el">
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
