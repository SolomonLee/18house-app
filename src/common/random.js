import MD5 from "./md5";
import { storage, initLocal } from "./localStorageExtend";

initLocal({
    randomImageMap: "fe2c4f50c64c82149323ac3e85bcb399",
    md5Map: "e51b939d7b6059e8550d170851f096bd",
});

const initRandomImageMap = () => {
    console.log("test");
    window.randomImageMap = storage.randomImageMap.get();
    window.md5Map = storage.md5Map.get();
    if (window.randomImageMap == null) window.randomImageMap = {};
    if (window.md5Map == null) window.md5Map = {};
    if (window.timerUpdateRandomMap === undefined) {
        window.timerUpdateRandomMap = setInterval(() => {
            window.randomImageMap = storage.randomImageMap.get();
            window.md5Map = storage.md5Map.get();
        }, 5000);
    }
};

const random_characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+?><|-";

export const randomString = (length) => {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(
            random_characters.charAt(
                Math.floor(Math.random() * random_characters.length)
            )
        );
    }
    return result.join("");
};

export const randomImage = (str, width = 100, height = 100) => {
    if (window.md5Map === undefined || window.randomImageMap === undefined)
        initRandomImageMap();

    if (window.md5Map[str] === undefined) {
        window.md5Map[str] = MD5(str);
        setTimeout(() => storage.md5Map.set(window.md5Map));
    }

    const md5 = window.md5Map[str];
    if (window.randomImageMap[md5] !== undefined) {
        return window.randomImageMap[md5];
    }

    const elementCanvas = document.createElement("canvas");
    elementCanvas.width = width;
    elementCanvas.height = height;
    const canvas = elementCanvas.getContext("2d");

    if (str.length > 32) str = md5;
    for (let i = 0; i < str.length; i++) {
        const ascii = parseInt(str[i].charCodeAt()) + i * 50000 * Math.PI;
        const x = ascii % width;
        const y = (ascii * 66551) % height;

        // Red, green, blue should be integers in the range of 0 - 255
        const r = Math.floor((ascii * 1234) % 250);
        const g = Math.floor((ascii * 4567) % 250);
        const b = Math.floor((ascii * 9874) % 250);

        const a = ascii / (ascii + (ascii / 10) * Math.PI);

        // console.log(x, y, r, g, b, a);
        canvas.beginPath();
        canvas.arc(x, y, 20, 20, ((ascii * Math.PI) % 100) * 2, false);
        canvas.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        canvas.stroke();
    }

    const url = elementCanvas.toDataURL();
    window.randomImageMap[md5] = url;
    setTimeout(() => storage.randomImageMap.set(window.randomImageMap));

    return elementCanvas.toDataURL();
};
