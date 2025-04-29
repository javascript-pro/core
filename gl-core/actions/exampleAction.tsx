import { setUbereduxKey } from "../";

export const exampleAction = (payload: any): any =>
  async (dispatch: any) => {
    try {
      console.log("exampleAction", payload);
      // dispatch(setUbereduxKey({ key: "authedUser", value: authedUser }));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(setUbereduxKey({ key: "error", value: e.message }));
      } else {
        dispatch(setUbereduxKey({ key: "error", value: String(e) }));
      }
    }
  };
