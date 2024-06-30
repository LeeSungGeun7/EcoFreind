export const elapsedTime = (date) => {
    const start = new Date(date);
    const end = new Date();

    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
    if (seconds < 60) return '방금 전';

    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;

    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;

    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;

    const weeks = days / 7;
    if (weeks < 4) return `${Math.floor(weeks)}주 전`;

    // const months = weeks / 12;
    // if (months < 12) return `${Math.floor(months+1)}달 전`;


    return `${start.toLocaleDateString()}`;
};