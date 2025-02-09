"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider as MuiLocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const LocalizationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
