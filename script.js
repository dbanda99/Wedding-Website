// ——— Countdown ———
const weddingDate = new Date("October 31, 2025 00:00:00").getTime();
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;
  if (diff < 0) {
    countdownEl.innerText = "The wedding has ended!";
    return;
  }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
  const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
  const secs = Math.floor((diff % (1000*60)) / 1000);
  countdownEl.innerText = 
    `${days} DAYS : ` +
    `${String(hours).padStart(2,'0')}:` +
    `${String(mins).padStart(2,'0')}:` +
    `${String(secs).padStart(2,'0')}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ——— Add to Calendar ———
document.getElementById('addCalendarBtn')
  .addEventListener('click', addEventToCalendar);

function addEventToCalendar() {
  const ua = navigator.userAgent.toLowerCase();
  if (/android|iphone|ipad|ipod|windows phone|win|mac|linux/i.test(ua)) {
    createICS();
  } else {
    alert("Couldn't create a calendar event for you. Try doing it manually please.");
  }
}

function createICS() {
  // Event times (local → UTC)
  const start = new Date("October 31, 2025 09:00:00");
  const end   = new Date("October 31, 2025 11:00:00");
  const dtstamp = toICS(new Date());
  const dtstart = toICS(start);
  const dtend   = toICS(end);

  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Fernanda & David//EN
BEGIN:VEVENT
UID:${Date.now()}@wedding
DTSTAMP:${dtstamp}
DTSTART:${dtstart}
DTEND:${dtend}
SUMMARY:Fernanda & David's Wedding
DESCRIPTION:Join us to celebrate!
LOCATION:5904 West Dr, Laredo, TX 78041
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href       = url;
  a.download   = 'wedding-event.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function toICS(d) {
  return d.toISOString()
          .replace(/[-:]/g,'')
          .split('.')[0] + 'Z';
}
