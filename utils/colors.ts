export function generateLightColor(): string {
    let r, g, b;

    do {
        r = Math.floor(Math.random() * 128 + 128); // 128 to 255
        g = Math.floor(Math.random() * 128 + 128);
        b = Math.floor(Math.random() * 128 + 128);
    } while (Math.abs(r - g) < 30 && Math.abs(r - b) < 30 && Math.abs(g - b) < 30);

    return `#${ r.toString(16).padStart(2, '0') }${ g.toString(16).padStart(2, '0') }${ b.toString(16).padStart(2, '0') }`;
}