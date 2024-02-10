/**
 * Converts a date string from the format "dd/mm/yyyy" to "yyyy-mm-dd".
 * @param dateString The date string to be converted.
 * @returns The converted date string.
 */
export function getISODate(dateString: string) {
  const parts = dateString.split('/');

  // Reorder the parts: parts[2] = year, parts[1] = month, parts[0] = day
  return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
}
