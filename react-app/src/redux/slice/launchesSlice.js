import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  lunches: [],
};

export const lunchesSlice = createSlice({
  name: "lunches",
  initialState,
  reducers: {
    setLunches: (state, action) => {
      return { ...state, lunches: [...action.payload] };
    },
    setLastWeekLunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevWeek = moment(todayDate).subtract(1, "week").startOf("week").format("LLLL");
      const lastDayOfPrevWeek = moment(todayDate).subtract(1, "week").endOf("week").format("LLLL");
      return {
        ...state,
        lunches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevWeek, lastDayOfPrevWeek);
        }),
      };
    },
    setLastMonthLunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevMonth = moment(todayDate).subtract(1, "month").startOf("month").format("LLLL");
      const lastDayOfPrevMonth = moment(todayDate).subtract(1, "month").endOf("month").format("LLLL");
      return {
        ...state,
        lunches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevMonth, lastDayOfPrevMonth);
        }),
      };
    },
    setLastYearLunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevYear = moment(todayDate).subtract(1, "year").startOf("year").format("LLLL");
      const lastDayOfPrevYear = moment(todayDate).subtract(1, "year").endOf("year").format("LLLL");
      return {
        ...state,
        lunches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevYear, lastDayOfPrevYear);
        }),
      };
    },
  },
});

export const { setLunches, setLastWeekLunches, setLastMonthLunches, setLastYearLunches } = lunchesSlice.actions;
export default lunchesSlice.reducer;
