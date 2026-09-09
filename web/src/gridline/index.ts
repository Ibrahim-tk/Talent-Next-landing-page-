/**
 * GRIDLINE
 * The TALENTnext design system.
 *
 * Public surface. Application code imports from `@gridline` and never
 * reaches into a component folder directly.
 *
 * Note: token stylesheets are side-effectful CSS and are imported once in
 * `src/app/layout.tsx`, not from here.
 */

/* ---- Layout ------------------------------------------------------------- */
export { GridCanvas } from "./components/GridCanvas/GridCanvas";
export type { GridCanvasProps } from "./components/GridCanvas/GridCanvas";

export { GridModule } from "./components/GridModule/GridModule";
export type {
  GridModuleProps,
  GridModuleRule,
} from "./components/GridModule/GridModule";

export { SectionHeader } from "./components/SectionHeader/SectionHeader";
export type { SectionHeaderProps } from "./components/SectionHeader/SectionHeader";

export { SurfaceCard } from "./components/SurfaceCard/SurfaceCard";
export type {
  SurfaceCardProps,
  SurfaceTone,
  SurfaceBorder,
  SurfaceRadius,
  SurfaceElevation,
  SurfacePadding,
} from "./components/SurfaceCard/SurfaceCard";

/* ---- Type --------------------------------------------------------------- */
export { Text } from "./components/Text/Text";
export type {
  TextProps,
  TextVariant,
  TextTone,
  TextAlign,
  TextWeight,
  TextMeasure,
} from "./components/Text/Text";

export { Highlight } from "./components/Highlight/Highlight";
export type { HighlightProps } from "./components/Highlight/Highlight";

/* ---- Actions & forms ---------------------------------------------------- */
export { Button } from "./components/Button/Button";
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from "./components/Button/Button";

export { PillGroup, PillOption } from "./components/PillGroup/PillGroup";
export type {
  PillGroupProps,
  PillOptionProps,
  PillChoice,
} from "./components/PillGroup/PillGroup";

export {
  Field,
  FieldRow,
  TextField,
} from "./components/TextField/TextField";
export type {
  FieldProps,
  FieldRowProps,
  FieldRowLayout,
  TextFieldProps,
} from "./components/TextField/TextField";

/* ---- Data display ------------------------------------------------------- */
export {
  MeterRow,
  SegmentedMeter,
} from "./components/SegmentedMeter/SegmentedMeter";
export type {
  MeterRowProps,
  SegmentedMeterProps,
  SegmentedMeterSize,
} from "./components/SegmentedMeter/SegmentedMeter";

export { ProgressTrack } from "./components/ProgressTrack/ProgressTrack";
export type {
  ProgressTrackProps,
  ProgressTone,
  ProgressSize,
  ProgressMode,
} from "./components/ProgressTrack/ProgressTrack";

export { RulerGauge } from "./components/RulerGauge/RulerGauge";
export type { RulerGaugeProps } from "./components/RulerGauge/RulerGauge";

export { StepperTimeline } from "./components/StepperTimeline/StepperTimeline";
export type {
  StepperTimelineProps,
  StepperStep,
  StepState,
} from "./components/StepperTimeline/StepperTimeline";

/* ---- Media -------------------------------------------------------------- */
export {
  Thumbnail,
  TintedMedia,
  VideoFrame,
} from "./components/Media/Media";
export type {
  ThumbnailProps,
  TintedMediaProps,
  VideoFrameProps,
} from "./components/Media/Media";

/* ---- Decoration --------------------------------------------------------- */
export { Crosshair, CrosshairSet } from "./components/Crosshair/Crosshair";
export type {
  CrosshairProps,
  CrosshairCorner,
  CrosshairPlacement,
} from "./components/Crosshair/Crosshair";

export { DashedFrame } from "./components/DashedFrame/DashedFrame";
export type { DashedFrameProps } from "./components/DashedFrame/DashedFrame";

/* ---- Icons -------------------------------------------------------------- */
export { Icon } from "./components/Icon/Icon";
export type { IconProps, IconName } from "./components/Icon/Icon";

/* ---- Utilities & tokens ------------------------------------------------- */
export { cx } from "./utils/cx";
export type { ClassValue } from "./utils/cx";

export { color, space, layout, pinnedMediaQuery } from "./tokens";
export type { ColorToken } from "./tokens";
