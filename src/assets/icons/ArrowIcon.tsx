import React from "react";
import clsx from "clsx";
import { IIcons } from "./iconsType";

function ArrowIcon({ fillColor, rotateDegree, width, height, className }: IIcons.IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 16}
      height={height || 16}
      viewBox="0 0 16 16"
      className={clsx("inline", rotateDegree && `transform rotate-${rotateDegree}`, className)}
    >
      <g fill="none" fillRule="evenodd">
        <g fill={fillColor || "#D31C39"}>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <path
                      d="M6.42.282C6.323.108 6.139 0 5.939 0H.553C.353 0 .17.108.071.282-.027.456-.024.669.08.84l2.692 4.449c.1.165.28.267.474.267.194 0 .373-.102.474-.267L6.412.839c.103-.17.107-.383.009-.557z"
                      transform="translate(-461 -749) translate(-38 708) translate(288) translate(211 40) translate(0 1) translate(4.667 6)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
export default ArrowIcon;
