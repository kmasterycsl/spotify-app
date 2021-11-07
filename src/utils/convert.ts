export function milisToMinAndSec(milis: number) {
    const mins = Math.floor(milis / 60000);
    const secs = Math.floor((milis - mins * 60000) / 1000);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function adjustColor(color: string, amount: number) {
    return (
        "#" +
        color
            .replace(/^#/, "")
            .replace(/../g, color =>
                (
                    "0" + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
                ).substr(-2)
            )
    );
}
