import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    body: { bg: "bg", color: "fg", fontFamily: "body" },
    "::selection": { bg: "club.ink", color: "white" },
    ":focus-visible": { outline: "2px solid", outlineColor: "role.mobile", outlineOffset: "4px" },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-poppins), Poppins, sans-serif" },
        heading: { value: "var(--font-poppins), Poppins, sans-serif" },
      },
      colors: {
        club: { ink: { value: "#001C26" } },
        faq: { gray: { value: "#EDEDED" } },
        role: {
          frontend: { value: "#00FF66" },
          mobile: { value: "#006AFF" },
          backend: { value: "#FF5656" },
          design: { value: "#FA00FF" },
          qa: { value: "#FFC700" },
        },
        recruit: { violet: { value: "#9C58FD" }, sky: { value: "#74DAFF" } },
      },
      spacing: {
        compact: { value: "16px" }, card: { value: "24px" },
        section: { value: "32px" }, outer: { value: "128px" },
      },
      radii: {
        square: { value: "0px" }, field: { value: "8px" },
        feature: { value: "24px" }, pill: { value: "9999px" },
      },
    },
    semanticTokens: {
      colors: {
        bg: { DEFAULT: { value: "{colors.white}" }, inverted: { value: "{colors.black}" } },
        fg: { DEFAULT: { value: "{colors.black}" }, inverted: { value: "{colors.white}" } },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
