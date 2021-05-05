import { storage, initSession } from "./sessionStorageExtend";

initSession({
  getSelfIp: "network_getSelfIp",
});

export const getSelfIp = async () => {
  const orgData = storage.getSelfIp.get();
  if (orgData != null) {
    return orgData.ipAddress;
  }

  await fetch("https://api.db-ip.com/v2/free/self")
    .then((res) => res.json())
    .then((data) => {
      storage.getSelfIp.set(data);
    });

  return storage.getSelfIp.get().ipAddress;
};
