import classNames from "classnames";

type ClassMap<T extends string> = Partial<{
  [variant in T]: [string?, { [key: string]: boolean | undefined }?];
}>;

export class ClassNameHelper {
  static getFromVariant<T extends string>(
    variant: T,
    defaultClassName?: string,
    classMap?: ClassMap<T>
  ): string {
    const variantClasses = classMap[variant];

    return classNames(defaultClassName + " ", classNames(variantClasses));
  }
}
