const CACHED_XP : number[] = [0,0];
export function XP_FOR_LEVEL (level: number): number {
    if(typeof CACHED_XP[level] === 'number') return CACHED_XP[level];
    let xpLastLevel = XP_FOR_LEVEL(level - 1);
    let needed = Math.floor(xpLastLevel * 1.05 + (level - 1) * 5);
    CACHED_XP[level] = needed;
    return needed;
}

for(let i = 0; i < 1000; i++) {
    console.log(`Level ${i} needs ${XP_FOR_LEVEL(i).toLocaleString()} XP`);
}