export const addMinutesToTime = (time, minutesToAdd) => {
  const [hours, minutes] = time.split(':').map(Number);

  // Convert time to minutes and add the minutes to it
  const totalMinutes = hours * 60 + minutes + minutesToAdd;

  // Calculate the new hours and minutes
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  // Format the new hours and minutes as strings with leading zeros
  const formattedHours = String(newHours).padStart(2, '0');
  const formattedMinutes = String(newMinutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export const getMinDate = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d
}

export const hhmm = (number) => {
  return `${number}:00`
}