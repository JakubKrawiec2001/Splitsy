import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  Month,
  Agenda,
  DragAndDrop,
  WorkWeek,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

const Calendar = () => {
  registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

  const getCurrentWeekDate = (
    dayOffset: number,
    hours: number,
    minutes: number
  ): string => {
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay();
    const targetDate = new Date(today.setDate(firstDayOfWeek + dayOffset));
    targetDate.setHours(hours, minutes, 0, 0);
    return targetDate.toISOString();
  };

  const events = [
    {
      Id: 1,
      Subject: "Monthly Invoice Payment",
      Location: "Space Center USA",
      StartTime: getCurrentWeekDate(1, 10, 0),
      EndTime: getCurrentWeekDate(1, 12, 30),
      CategoryColor: "#1aaa55",
    },
    {
      Id: 2,
      Subject: "Tax Submission Deadline",
      Location: "Newyork City",
      StartTime: getCurrentWeekDate(2, 9, 0),
      EndTime: getCurrentWeekDate(2, 11, 30),
      CategoryColor: "#357cd2",
    },
    {
      Id: 3,
      Subject: "Utility Bills Due Date",
      Location: "Space Center USA",
      StartTime: getCurrentWeekDate(3, 14, 0),
      EndTime: getCurrentWeekDate(3, 15, 30),
      CategoryColor: "#7fa900",
    },
  ];
  return (
    <div>
      <ScheduleComponent eventSettings={{ dataSource: events }} height="650px">
        <Inject
          services={[Day, Week, Month, Agenda, DragAndDrop, WorkWeek, Resize]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
