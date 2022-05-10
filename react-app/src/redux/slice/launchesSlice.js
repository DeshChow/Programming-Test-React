import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  launches: [],
};

export const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    getLaunches: (state, action) => {
      return { ...state, launches: [...action.payload] };
    },
    getLastWeekLaunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevWeek = moment(todayDate).subtract(1, "week").startOf("week").format("LLLL");
      const lastDayOfPrevWeek = moment(todayDate).subtract(1, "week").endOf("week").format("LLLL");
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevWeek, lastDayOfPrevWeek);
        }),
      };
    },
    getLastMonthLaunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevMonth = moment(todayDate).subtract(1, "month").startOf("month").format("LLLL");
      const lastDayOfPrevMonth = moment(todayDate).subtract(1, "month").endOf("month").format("LLLL");
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevMonth, lastDayOfPrevMonth);
        }),
      };
    },
    getLastYearLaunches: (state, action) => {
      const todayDate = new Date();
      const startDayOfPrevYear = moment(todayDate).subtract(1, "year").startOf("year").format("LLLL");
      const lastDayOfPrevYear = moment(todayDate).subtract(1, "year").endOf("year").format("LLLL");
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          const launchDate = launch.launch_date_utc;
          return moment(launchDate).isBetween(startDayOfPrevYear, lastDayOfPrevYear);
        }),
      };
    },
    getFailureLaunches: (state, action) => {
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          return launch.launch_success === false;
        }),
      };
    },
    getSuccessfullLaunches: (state, action) => {
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          return launch.launch_success === true;
        }),
      };
    },
    getUpcomingLaunches: (state, action) => {
      return {
        ...state,
        launches: action.payload.filter((launch) => {
          return launch.upcoming === true;
        }),
      };
    },
  },
});

export const {
  getLaunches,
  getLastWeekLaunches,
  getLastMonthLaunches,
  getLastYearLaunches,
  getFailureLaunches,
  getSuccessfullLaunches,
  getUpcomingLaunches,
} = launchesSlice.actions;
export default launchesSlice.reducer;
