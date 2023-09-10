import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import type React from "react";
import type {IconProp} from "@fortawesome/fontawesome-svg-core";
import {IconDefinition} from "@fortawesome/pro-regular-svg-icons";

export interface Props {
    icon: IconDefinition;
    colors?: string[];
    className: string;
}

const Icon: React.FC<Props> = ({icon, colors = [], className}) => {
    const getColorStyle = (colors: string[]) => {
        switch (colors.length) {
            case 2:
                return {
                    "--fa-primary-color": colors[0] || 'inherit',
                    "--fa-secondary-color": colors[1] || 'inherit'
                } as React.CSSProperties;
            case 1:
                return {color: colors[0]} as React.CSSProperties;
            default:
                return {};
        }
    }
    return (
        <FontAwesomeIcon icon={icon} className={className} style={getColorStyle(colors)}/>
    )
}

export default Icon;