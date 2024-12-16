// import {
//   ScheduleComponent,
//   Inject,
//   Day,
//   Week,
//   WorkWeek,
//   Month,
//   Agenda,
// } from "@syncfusion/ej2-react-schedule";

const Calendar = () => {
  //   const events = [
  //     {
  //       Subject: "Meeting with Team",
  //       StartTime: new Date(2024, 11, 3, 10, 0),
  //       EndTime: new Date(2024, 11, 3, 11, 0),
  //     },
  //     {
  //       Subject: "Project Deadline",
  //       StartTime: new Date(2024, 11, 10, 9, 0),
  //       EndTime: new Date(2024, 11, 10, 18, 0),
  //     },
  //     {
  //       Subject: "Client Presentation",
  //       StartTime: new Date(2024, 11, 15, 14, 0),
  //       EndTime: new Date(2024, 11, 15, 15, 30),
  //     },
  //     {
  //       Subject: "Holiday Party",
  //       StartTime: new Date(2024, 11, 20, 18, 0),
  //       EndTime: new Date(2024, 11, 20, 22, 0),
  //     },
  //     {
  //       Subject: "Year-End Review",
  //       StartTime: new Date(2024, 11, 27, 10, 0),
  //       EndTime: new Date(2024, 11, 27, 12, 0),
  //     },
  //   ];
  return (
    <div>
      Calendar{" "}
      {/* <ScheduleComponent eventSettings={{ dataSource: events }}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent> */}
    </div>
  );
};

export default Calendar;

// actionBegin={(args) => {
//   if (args.requestType === "eventCreate") {
//     handleEventAdd(args);
//   }
// }}
