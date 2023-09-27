import React, { FunctionComponent, useEffect, useState } from "react";
import { StylingHelper } from "@/components/utils/StylingHelper";
import { Tabs, TabsVariant } from "../tabs/tabs";
import { IconButton } from "../button/icon-button";
import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { Highlight, themes } from "prism-react-renderer";
import classNames from "classnames";

export interface CodePreviewProps {
  className?: string;
  code: string;
  renderPreview?: boolean;
}

export const CodePreview: FunctionComponent<CodePreviewProps> = ({
  className,
  code,
  renderPreview,
}) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // Add this state
  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCodeCopied(true);
      console.log("devrait être copié");
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  useEffect(() => {
    if (isCodeCopied) {
      const timeoutId = setTimeout(() => {
        setIsCodeCopied(false);
      }, 1750);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isCodeCopied]);

  const getDiviserClass = StylingHelper.classNames([className, ""]);

  return (
    <div
      className={classNames(
        "border-outline-variant border bg-surface rounded-xl overflow-hidden",
        { dark: !renderPreview || selectedTab == 1 }
      )}
    >
      <div className="flex justify-between relative">
        {renderPreview && (
          <Tabs
            onTabSelected={setSelectedTab}
            variant={TabsVariant.Secondary}
            tabs={[{ label: "Preview" }, { label: "Code" }]}
          />
        )}
        <IconButton
          activated={isCodeCopied}
          className={classNames({
            "absolute right-0": !renderPreview,
          })}
          arialLabel="Copy code to clipboard"
          onToggle={copyCodeToClipboard}
          icon={faClipboard}
          iconSelected={faClipboardCheck}
        ></IconButton>
      </div>

      <div>
        <Highlight theme={themes.vsDark} code={code} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="px-4 !bg-surface-container py-3 overflow-auto"
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};
