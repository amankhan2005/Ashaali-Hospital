 export function generateSlots(opdHours) {
  // opdHours = number of hours doctor is available (int)
  const slots = [];
  const startHour = 10; // maan lo clinic 10 baje se start hota h
  const minutesPerSlot = opdHours === 1 ? 5 : opdHours >= 2 ? 10 : 15;

  let currentTime = new Date();
  currentTime.setHours(startHour, 0, 0, 0);

  for (let i = 0; i < (60 * opdHours) / minutesPerSlot; i++) {
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    slots.push(`${hours}:${minutes}`);

    currentTime.setMinutes(currentTime.getMinutes() + minutesPerSlot);
  }
  return slots;
}
