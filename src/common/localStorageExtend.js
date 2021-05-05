export const storage = {};

export const initLocal = (objLocalNames) => {
    if (typeof objLocalNames !== "object") return false;

    for (const [shortName, realName] of Object.entries(objLocalNames)) {
        storage[shortName] = {
            get: () => {
                try {
                    return JSON.parse(window.localStorage.getItem(realName));
                } catch {
                    return window.localStorage.getItem(realName);
                }
            },
            set: (val) =>
                window.localStorage.setItem(realName, JSON.stringify(val)),
        };
    }

    return true;
};
