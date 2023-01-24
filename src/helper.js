import { useState, useEffect } from "react";

export function useParentFunction() {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const call = ({ action, params = {} }) => {
    return communicationHandler({ action, params })
      .then((data) =>
        setResponse({ data: data.result, error: null, loading: false })
      )
      .catch((error) =>
        setResponse({ data: null, error: error.msg, loading: false })
      );
  };

  return { response, call };
}

export const communicationHandler = ({ action, params = {} }) => {
  const channel = new MessageChannel();
  try {
    window.parent.postMessage({ action, params }, "*", [channel.port2]);
    return new Promise((res, rej) => {
      channel.port1.onmessage = ({ data }) => {
        channel.port1.close();
        if (data.error) {
          rej({ msg: data.error });
        } else {
          res({ result: data.msg });
        }
      };
    });
  } catch (error) {
    console.log("Error posting message");
  }
};
