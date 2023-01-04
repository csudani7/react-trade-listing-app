import React from "react";
import clsx from "clsx";
import { IIcons } from "./iconsType";

function ArrowOutlineIcon({ fillColor, rotateDegree, width, height, className }: IIcons.IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      className={clsx("inline", className)}
      style={{ transform: `rotate(${rotateDegree}deg)` }}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fillColor || "#05ADBB"}>
          <g>
            <g>
              <g>
                <path
                  d="M8.333 15.833c-.188 0-.378-.063-.533-.193-.354-.294-.401-.82-.107-1.173l3.73-4.476-3.596-4.468c-.288-.359-.232-.884.127-1.172.359-.288.883-.232 1.172.127l4.024 5c.248.309.245.75-.01 1.055l-4.166 5c-.165.198-.402.3-.641.3"
                  transform="translate(-1088 -8014) translate(517 7428) translate(241 576) translate(330 10)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
export default ArrowOutlineIcon;
