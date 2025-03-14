/***************************************************
 * 1) COUNTDOWN USING DEVICE TIME
 ***************************************************/

// Set the wedding date/time here (local device time used for 'now')
const weddingDate = new Date("October 31, 2025 7:00:00").getTime();
const countdownElement = document.getElementById('countdown');

// Update countdown every second
function updateCountdown() {
  const now = new Date().getTime(); // device's current time
  const distance = weddingDate - now;

  if (distance < 0) {
    countdownElement.innerText = "The wedding has ended!";
    return;
  }

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Format countdown string
  countdownElement.innerText =
    `${days} DAYS : ` +
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to avoid "Loading..."


/***************************************************
 * 2) ADD TO CALENDAR LOGIC
 ***************************************************/
document.getElementById('addCalendarBtn').addEventListener('click', addEventToCalendar);

function addEventToCalendar() {
  // Simple user-agent check for demonstration:
  const userAgent = navigator.userAgent.toLowerCase();

  // If we detect typical desktop or mobile platforms:
  if (/android|iphone|ipad|ipod|windows phone|win|mac|linux/i.test(userAgent)) {
    createICSFile();
  } else {
    // If the device isn't recognized, show an alert
    alert("Couldn't create a calendar event for you. Try doing it manually please.");
  }
}

// Create and download an ICS file, which most devices can open in their calendar
function createICSFile() {
  // Wedding start & end times in JavaScript Date form
  // Adjust the times as needed (e.g., 9:00 AM to 11:00 AM)
  const eventStart = new Date("October 31, 2025 07:00:00");
  const eventEnd   = new Date("October 31, 2025 11:00:00");

  const icsContent =
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "PRODID:-//Your Company//NONSGML v1.0//EN\n" +
    "BEGIN:VEVENT\n" +
    "UID:" + new Date().getTime() + "@yourcompany.com\n" +
    "DTSTAMP:" + toICSDateString(new Date()) + "\n" +
    "DTSTART:" + toICSDateString(eventStart) + "\n" +
    "DTEND:" + toICSDateString(eventEnd) + "\n" +
    "SUMMARY:Fernada & David's Wedding\n" +
    "DESCRIPTION:Join us to celebrate!\n" +
    "LOCATION:Your Venue Location\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  // Create a Blob from the ICS string
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // Create a hidden link, set the .ics file, and auto-click it
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-event.ics"; // The file name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Convert a Date to the ICS-compliant format: YYYYMMDDTHHMMSSZ (UTC)
function toICSDateString(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}
