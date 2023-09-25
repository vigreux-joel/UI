import React, { FunctionComponent } from "react";
import { StylingHelper } from "@/components/utils/StylingHelper";
import { Tabs, TabsVariant } from "../tabs/tabs";

export interface CodePreviewProps {
  className?: string;
}

export const CodePreview: FunctionComponent<CodePreviewProps> = ({
  className,
}) => {
  const getDiviserClass = StylingHelper.classNames([className, ""]);

  return (
    <div>
      <div>
        <Tabs
          variant={TabsVariant.Secondary}
          tabs={[{ label: "Preview" }, { label: "Code" }]}
        />
      </div>
      <div></div>
    </div>
  );
};
