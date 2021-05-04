
type SessionNames = {
  [sessionName: string] : string
}

type  SingleStorage = {
    get(): any,
    set(val:any): void,
}

type Storages = {
    [keyname: string] : SingleStorage 
} 

export const storage = <Storages>{};

export const initSession = (sessionNames : SessionNames) => {
  if (typeof sessionNames !== "object") return false;

  for (const [shortName, realName] of Object.entries(sessionNames)) {
    storage[shortName] = {
      get: () => {
        try {
            const data = window.sessionStorage.getItem(realName);
            if(data == null) return null;

            return JSON.parse(data);
        } catch {
          return window.sessionStorage.getItem(realName);
        }
      },
      set: (val:any) =>
        window.sessionStorage.setItem(realName, JSON.stringify(val)),
    };
  }
 
  return true;
};