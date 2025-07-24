export function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Jan = 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const planExpiresIn = (expiresAt) => {
  const currentDate = new Date();
  const expirationDate = new Date(expiresAt);
  const timeDiff = expirationDate - currentDate;
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};

export const formatDateDDMMYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDateTimeDDMMYYYY = (dateInput) => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return `${day}-${month}-${year}, ${formattedTime}`;
};

export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
