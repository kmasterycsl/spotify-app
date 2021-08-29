export function milisToMinAndSec(milis: number) {
    const mins = Math.floor(milis / 60000);
    const secs = Math.floor((milis - mins * 60000) / 1000);

    return `${mins}:${secs.toString().padStart(2, '0')}`;
}