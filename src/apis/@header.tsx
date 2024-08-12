import { EnvConfig } from "@/configs/envConfig";

const header = (type?: "file") => {
  let header = {};

  if (type == "file") {
    return {
      responseType: "blob",
      headers: { "ngrok-skip-browser-warning": "true" },
    };
  }
  if (typeof window !== "undefined") {
    header = {
      headers: {
        "x-access-token": localStorage.getItem(EnvConfig.LocalToken) ?? "",
        "ngrok-skip-browser-warning": "true",
      },
    };
  } else {
    header = {
      headers: { "x-access-token": "", "ngrok-skip-browser-warning": "true" },
    };
  }
  return header;
};

export default header;
