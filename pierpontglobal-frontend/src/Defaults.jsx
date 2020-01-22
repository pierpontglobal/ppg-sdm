import { createMuiTheme, Button } from "@material-ui/core";
import styled from "styled-components";

export const OneSignalKey =
  process.env.NODE_ENV === "development"
    ? "5af646ab-8c73-474b-9ebf-f19036693a2b"
    : "76b26e12-3abb-4faf-8ca2-a589f73a602c";
export const ApiServer =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:3000"
    : "https://api.pierpontglobal.com";
export const StripeKey =
  process.env.NODE_ENV === "development"
    ? "pk_test_mPENMxq3MENOAxDxZDVUZajS"
    : "pk_live_Rnf6s2eReIqXTzHhZGFvFvMA";
export const WSConnection =
  process.env.NODE_ENV === "development"
    ? "ws://0.0.0.0:3000/cable"
    : "wss://api.pierpontglobal.com/cable";

export const AccentButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%) !important;
  border-radius: 3 !important;
  border: 0 !important;
  color: white !important;
  height: 48px !important;
  padding: 0 30px !important;
  box-shadow: 0 0 15px 5px rgba(255, 105, 135, 0.3) !important;
`;

export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: "#3A3E43" },
    secondary: { main: "#FAFAFA" },
    accent: { main: "#27E888" },
    action: { main: "#3e78c0" }
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        borderRadius: 3,
        border: 0,
        height: 48
      }
    }
  },
  typography: {
    fontFamily: "Raleway, serif",
    useNextVariants: true
  }
});
export const CountriesList = [
  { key: "DO", name: { en: "Dominican Republic", es: "República Dominicana" } },
  { key: "US", name: { en: "United States", es: "Estados Unidos" } }
];
