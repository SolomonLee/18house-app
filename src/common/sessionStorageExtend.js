export const storage = {};

export const initSession = (objSessionNames) => {
  if (typeof objSessionNames !== "object") return false;

  for (const [shortName, realName] of Object.entries(objSessionNames)) {
    storage[shortName] = {
      get: () => {
        try {
          return JSON.parse(window.sessionStorage.getItem(realName));
        } catch {
          return window.sessionStorage.getItem(realName);
        }
      },
      set: (val) =>
        window.sessionStorage.setItem(realName, JSON.stringify(val)),
    };
  }

  return true;
};
