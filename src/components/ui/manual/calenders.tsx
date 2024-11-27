import React, { useState } from "react";
import { Paymenttype } from "@/types";

const Calendar = ({ array }: { array: Paymenttype[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date state
  const [hoveredDate, setHoveredDate] = useState<string | null>(null); // State for hovered date

  // Get the number of days in the current month
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate(); // Last day of the month
  };

  // Get the day of the week the month starts on
  const startDayOfWeek = (year: number, month: number) => {
    return new Date(year, month, 1).getDay(); // First day of the month
  };

  // Handle moving to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  // Handle moving to the next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Filter payments for a specific date
  const getPaymentsForDate = (date: string) => {
    if (!array) return []; // If array is null, return an empty array
    return array.filter(
      (payment) =>
        new Date(payment.date).toLocaleDateString() === new Date(date).toLocaleDateString()
    );
  };

  // Render the calendar days with payments (if available)
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month); // Total days in month
    const startDay = startDayOfWeek(year, month); // Start day of week

    const dates = [];
    for (let i = 0; i < startDay; i++) {
      dates.push(<div key={`empty-${i}`} className="empty-day"></div>); // Empty divs for preceding days
    }

    for (let day = 1; day <= days; day++) {
      const dateString = new Date(year, month, day).toLocaleDateString(); // Use local date
      const payments = getPaymentsForDate(dateString);

      const firstPayment = payments[0]?.payment;
      const otherPayments = payments.slice(1).map((p) => p.payment);

      dates.push(
        <div
          key={day}
          className="day relative border p-2 pb- text-center bg-gray-800 hover:bg-gray-200 transition duration-300 flex flex-col justify-start"
          onMouseEnter={() => setHoveredDate(dateString)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          <div className="text-lg font-bold mb-1">{day}</div>
          {firstPayment > 0 && (
            <div className="flex bottom-0 right-0 text-[9px] text-white">
              ₹{firstPayment.toString()} {otherPayments.length > 0 && `(+${otherPayments.length})`}
            </div>
          )}
          {hoveredDate === dateString && otherPayments.length > 0 && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-8 w-32 bg-gray-200 text-black dark:text-white rounded-md shadow-lg p-2 z-10">
              <div className="text-sm">Other Payments:</div>
              {otherPayments.map((payment, index) => (
                <div key={index} className="text-xs">₹{payment.toString()}</div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return dates;
  };

  return (
    <div className="calendar bg-gradient-radial from-slate-800 to-black">
      <div className="calendar-header flex justify-between items-center p-4 bg-gray-800">
        <button onClick={handlePrevMonth} className="p-2 bg-gray-500 text-white rounded">
          Prev
        </button>
        <div className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </div>
        <button onClick={handleNextMonth} className="p-2 bg-gray-500 text-white rounded">
          Next
        </button>
      </div>

      <div className="calendar-grid grid grid-cols-7 gap-2 p-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-center text-white">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
