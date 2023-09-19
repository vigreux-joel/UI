import classnames from "classnames";

type BaseStyles = string | Record<string, boolean | undefined>;

type Styles =
  | BaseStyles
  | { applyWhen: Boolean; styles: BaseStyles | BaseStyles[] };

type StylesVariants<T extends string> =
  | BaseStyles
  | { applyWhen: T; styles: BaseStyles | BaseStyles[] };

export class StylesHandler {
  static getStyles(styles?: Styles | Styles[]): string {
    if (!styles) return "";

    const collectedStyles = Array.isArray(styles)
      ? styles.flatMap((item) => this.collectStyles(item))
      : this.collectStyles(styles);

    console.log(collectedStyles);
    return collectedStyles.join(" ");
  }

  static getVariantStyles<T extends string>(
    variant: T,
    stylesList: StylesVariants<T>[] | StylesVariants<T>
  ): string {
    const styles = Array.isArray(stylesList) ? stylesList : [stylesList];

    let styleNames = styles.flatMap((style) => {
      if (
        typeof style == "object" &&
        "applyWhen" in style &&
        typeof style.styles !== "boolean" &&
        style.applyWhen === variant &&
        style.styles
      ) {
        console.log("ij est opk: ", variant, style);
        return this.getStyles(style.styles);
      } else {
        return [this.getStyles(style as BaseStyles)];
      }
    });

    return styleNames.join(" ");
  }

  private static collectStyles(styles: Styles): string[] {
    if (typeof styles === "string") {
      return [styles];
    }

    if (
      "applyWhen" in styles &&
      typeof styles.styles !== "boolean" &&
      styles.applyWhen
    ) {
      if (Array.isArray(styles.styles)) {
        return styles.styles.flatMap((style) => this.getStyles(style));
      } else if (styles.styles !== undefined) {
        return [this.getStyles(styles.styles)];
      }
    }

    return [classnames(styles)];
  }
}
