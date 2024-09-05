import { defaultV2Css } from "survey-core";

export const customSurveyTheme = {
  ...defaultV2Css,
  root: "sd-root-modern",
  container: "sd-container-modern",
  header: "sd-title sd-container-modern__title",
  body: "sd-body sd-body-no-padding",
  footer: "sd-footer sd-body__navigation sd-clearfix",
  bodyContainer: "sv-components-row",
  title: "sd-title",
  description: "sd-description",
  logo: "sd-logo",
  logoImage: "sd-logo__image",
  headerText: "sd-header__text",
  question: {
    ...defaultV2Css.question,
    content: "sd-question__content sd-element__content",
    titleOnAnswer: "sd-question__title--answer",
    descriptionUnderInput: "sd-description sd-question__description sd-question__description--under-input",
    header: "sd-question__header sd-element__header sd-element__header--location-top",
    headerLeft: "sd-question__header--location--left",
    headerTop: "sd-question__header--location-top sd-element__header--location-top",
    headerBottom: "sd-question__header--location--bottom",
    titleRequired: "sd-question__title--required",
    number: "sd-element__num",
    composite: "sd-element--complex sd-composite",
  },
  panel: {
    ...defaultV2Css.panel,
    content: "sd-element__content sd-panel__content",
    title: "sd-title sd-element__title sd-panel__title",
    description: "sd-description sd-panel__description",
    container: "sd-element sd-element--complex sd-panel sd-row__panel",
  },
  row: "sd-row sd-clearfix",
  // Add any other custom styles you need
};
