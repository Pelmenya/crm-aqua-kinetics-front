export const getDayByIdx = (idx: number): string => {
    const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return dayNames[idx] || "";
};
