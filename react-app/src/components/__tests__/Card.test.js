import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "./../Card/Card";

afterEach(() => {
  cleanup();
});

test("should render card component", () => {
  const launch = {
    flight_number: 1,
    mission_name: "FalconSat",
    mission_id: [],
    upcoming: false,
    launch_year: "2006",
    launch_date_unix: 1143239400,
    launch_date_utc: "2006-03-24T22:30:00.000Z",
    launch_date_local: "2006-03-25T10:30:00+12:00",
    is_tentative: false,
    tentative_max_precision: "hour",
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: "falcon1",
      rocket_name: "Falcon 1",
      rocket_type: "Merlin A",
      first_stage: {
        cores: [
          {
            core_serial: "Merlin1A",
            flight: 1,
            block: null,
            gridfins: false,
            legs: false,
            reused: false,
            land_success: null,
            landing_intent: false,
            landing_type: null,
            landing_vehicle: null,
          },
        ],
      },
      second_stage: {
        block: 1,
        payloads: [
          {
            payload_id: "FalconSAT-2",
            norad_id: [],
            reused: false,
            customers: ["DARPA"],
            nationality: "United States",
            manufacturer: "SSTL",
            payload_type: "Satellite",
            payload_mass_kg: 20,
            payload_mass_lbs: 43,
            orbit: "LEO",
            orbit_params: {
              reference_system: "geocentric",
              regime: "low-earth",
              longitude: null,
              semi_major_axis_km: null,
              eccentricity: null,
              periapsis_km: 400,
              apoapsis_km: 500,
              inclination_deg: 39,
              period_min: null,
              lifespan_years: null,
              epoch: null,
              mean_motion: null,
              raan: null,
              arg_of_pericenter: null,
              mean_anomaly: null,
            },
          },
        ],
      },
      fairings: {
        reused: false,
        recovery_attempt: false,
        recovered: false,
        ship: null,
      },
    },
    ships: [],
    telemetry: {
      flight_club: null,
    },
    launch_site: {
      site_id: "kwajalein_atoll",
      site_name: "Kwajalein Atoll",
      site_name_long: "Kwajalein Atoll Omelek Island",
    },
    launch_success: false,
    launch_failure_details: {
      time: 33,
      altitude: null,
      reason: "merlin engine failure",
    },
    links: {
      mission_patch: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
      mission_patch_small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
      reddit_campaign: null,
      reddit_launch: null,
      reddit_recovery: null,
      reddit_media: null,
      presskit: null,
      article_link: "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
      wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
      video_link: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      youtube_id: "0a_00nJ_Y88",
      flickr_images: [],
    },
    details: "Engine failure at 33 seconds and loss of vehicle",
    static_fire_date_utc: "2006-03-17T00:00:00.000Z",
    static_fire_date_unix: 1142553600,
    timeline: {
      webcast_liftoff: 54,
    },
    crew: null,
  };
  render(<Card launch={launch} />);
  const cardElement = screen.getByTestId("card-1");
  expect(cardElement).toBeInTheDocument();
  expect(cardElement).toHaveTextContent("Mission Name");
  expect(cardElement).toHaveTextContent("Launch Date");
});

test("should render card which contain successful launches", () => {
  const launch = {
    flight_number: 4,
    mission_name: "RatSat",
    mission_id: [],
    launch_year: "2008",
    launch_date_unix: 1222643700,
    launch_date_utc: "2008-09-28T23:15:00.000Z",
    launch_date_local: "2008-09-28T11:15:00+12:00",
    is_tentative: false,
    tentative_max_precision: "hour",
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: "falcon1",
      rocket_name: "Falcon 1",
      rocket_type: "Merlin C",
      first_stage: {
        cores: [
          {
            core_serial: "Merlin2C",
            flight: 1,
            block: null,
            gridfins: false,
            legs: false,
            reused: false,
            land_success: null,
            landing_intent: false,
            landing_type: null,
            landing_vehicle: null,
          },
        ],
      },
      second_stage: {
        block: 1,
        payloads: [
          {
            payload_id: "RatSat",
            norad_id: [33393],
            reused: false,
            customers: ["SpaceX"],
            nationality: "United States",
            manufacturer: "SpaceX",
            payload_type: "Satellite",
            payload_mass_kg: 165,
            payload_mass_lbs: 363,
            orbit: "LEO",
            orbit_params: {
              reference_system: "geocentric",
              regime: "low-earth",
              longitude: null,
              lifespan_years: null,
              epoch: "2020-12-21T02:41:06.000Z",
              mean_motion: 14.84904616,
              raan: 236.9673,
              semi_major_axis_km: 6992.022,
              eccentricity: 0.0012404,
              periapsis_km: 605.214,
              apoapsis_km: 622.56,
              inclination_deg: 9.3453,
              period_min: 96.975,
              arg_of_pericenter: 85.029,
              mean_anomaly: 275.1325,
            },
          },
        ],
      },
      fairings: {
        reused: false,
        recovery_attempt: false,
        recovered: false,
        ship: null,
      },
    },
    ships: [],
    telemetry: {
      flight_club: null,
    },
    launch_site: {
      site_id: "kwajalein_atoll",
      site_name: "Kwajalein Atoll",
      site_name_long: "Kwajalein Atoll Omelek Island",
    },
    launch_success: true,
    links: {
      mission_patch: "https://images2.imgbox.com/e0/a7/FNjvKlXW_o.png",
      mission_patch_small: "https://images2.imgbox.com/e9/c9/T8CfiSYb_o.png",
      reddit_campaign: null,
      reddit_launch: null,
      reddit_recovery: null,
      reddit_media: null,
      presskit: null,
      article_link: "https://en.wikipedia.org/wiki/Ratsat",
      wikipedia: "https://en.wikipedia.org/wiki/Ratsat",
      video_link: "https://www.youtube.com/watch?v=dLQ2tZEH6G0",
      youtube_id: "dLQ2tZEH6G0",
      flickr_images: [],
    },
    details:
      "Ratsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1",
    upcoming: false,
    static_fire_date_utc: "2008-09-20T00:00:00.000Z",
    static_fire_date_unix: 1221868800,
    timeline: {
      webcast_liftoff: 5,
    },
    crew: null,
  };
  render(<Card launch={launch} />);
  const cardElement = screen.getByTestId("card-4");
  expect(cardElement).toBeInTheDocument();
  expect(cardElement).toHaveTextContent(
    "Falcon 1(Type-Merlin C)Mission Name: RatSatLaunch Date: September 29, 2008, 5:15:00 AMRatsat was carried to orbit on the first successful orbital launch of any privately funded and developed, liquid-propelled carrier rocket, the SpaceX Falcon 1"
  );
});

test("matches snapshot", () => {
  const launch = {
    flight_number: 1,
    mission_name: "FalconSat",
    mission_id: [],
    upcoming: false,
    launch_year: "2006",
    launch_date_unix: 1143239400,
    launch_date_utc: "2006-03-24T22:30:00.000Z",
    launch_date_local: "2006-03-25T10:30:00+12:00",
    is_tentative: false,
    tentative_max_precision: "hour",
    tbd: false,
    launch_window: 0,
    rocket: {
      rocket_id: "falcon1",
      rocket_name: "Falcon 1",
      rocket_type: "Merlin A",
      first_stage: {
        cores: [
          {
            core_serial: "Merlin1A",
            flight: 1,
            block: null,
            gridfins: false,
            legs: false,
            reused: false,
            land_success: null,
            landing_intent: false,
            landing_type: null,
            landing_vehicle: null,
          },
        ],
      },
      second_stage: {
        block: 1,
        payloads: [
          {
            payload_id: "FalconSAT-2",
            norad_id: [],
            reused: false,
            customers: ["DARPA"],
            nationality: "United States",
            manufacturer: "SSTL",
            payload_type: "Satellite",
            payload_mass_kg: 20,
            payload_mass_lbs: 43,
            orbit: "LEO",
            orbit_params: {
              reference_system: "geocentric",
              regime: "low-earth",
              longitude: null,
              semi_major_axis_km: null,
              eccentricity: null,
              periapsis_km: 400,
              apoapsis_km: 500,
              inclination_deg: 39,
              period_min: null,
              lifespan_years: null,
              epoch: null,
              mean_motion: null,
              raan: null,
              arg_of_pericenter: null,
              mean_anomaly: null,
            },
          },
        ],
      },
      fairings: {
        reused: false,
        recovery_attempt: false,
        recovered: false,
        ship: null,
      },
    },
    ships: [],
    telemetry: {
      flight_club: null,
    },
    launch_site: {
      site_id: "kwajalein_atoll",
      site_name: "Kwajalein Atoll",
      site_name_long: "Kwajalein Atoll Omelek Island",
    },
    launch_success: false,
    launch_failure_details: {
      time: 33,
      altitude: null,
      reason: "merlin engine failure",
    },
    links: {
      mission_patch: "https://images2.imgbox.com/40/e3/GypSkayF_o.png",
      mission_patch_small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
      reddit_campaign: null,
      reddit_launch: null,
      reddit_recovery: null,
      reddit_media: null,
      presskit: null,
      article_link: "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html",
      wikipedia: "https://en.wikipedia.org/wiki/DemoSat",
      video_link: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      youtube_id: "0a_00nJ_Y88",
      flickr_images: [],
    },
    details: "Engine failure at 33 seconds and loss of vehicle",
    static_fire_date_utc: "2006-03-17T00:00:00.000Z",
    static_fire_date_unix: 1142553600,
    timeline: {
      webcast_liftoff: 54,
    },
    crew: null,
  };

  const tree = renderer.create(<Card launch={launch} />).toJSON();
  expect(tree).toMatchSnapshot();
});
