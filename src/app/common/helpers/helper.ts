export function previewUrlFile(file): any {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target.result);
        reader.onerror = (e) => rej(e);
        reader.readAsDataURL(file);
    });
}

export function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}