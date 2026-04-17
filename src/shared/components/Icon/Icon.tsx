import React from 'react';
import { Svg } from './IconStyle';
import { exists, validIcons } from './svg';

interface IconProps {
  name: string;
  block?: string;
  size?: number;
  color?: string;
  strokeColor?: string;
  className?: string;
  height?: string;
  width?: string;
}

const Icon = (props: IconProps) => {
  const {
    name,
    block,
    size,
    color,
    strokeColor,
    height = validIcons[name]?.viewHeight,
    width = validIcons[name]?.viewWidth,
    className
  } = props;
  return exists(validIcons[name]) ? (
    <Svg
      viewBox={
        exists(validIcons[name].viewHeight)
          ? `0 0 ${validIcons[name].viewWidth} ${validIcons[name].viewHeight}`
          : '0 0 40 40'
      }
      block={block}
      focusable={false}
      aria-hidden
      style={exists(validIcons[name].style) ? validIcons[name].style : null}
      size={size}
      height={`${height}px`}
      width={`${width}px`}
      fill={color}
      className={className}
      {...props}
    >
      <g
        fillRule="evenodd"
        clipPath={validIcons[name].clipPath ? 'url(#clip0_2084_54964)' : 'none'}
      >
        {validIcons[name].paths.map((path) => (
          <React.Fragment key={path.id}>
            <path
              d={path.d}
              stroke={strokeColor ? strokeColor : path?.stroke}
              strokeWidth={path?.strokeWidth}
              strokeLinecap={path?.strokeLinecap === 'round' ? 'round' : 'butt'}
              strokeLinejoin={path?.strokeLinejoin === 'round' ? 'round' : 'miter'}
              style={{ opacity: path.opacity, fill: path.fill }}
              fill={path?.fill ? path?.fill : 'none'}
              opacity={path?.opacity ? path?.opacity : '1'}
            />
          </React.Fragment>
        ))}
      </g>
      {validIcons[name]?.clipPath && (
        <defs>
          <clipPath id="clip0_2084_54964">
            {validIcons[name]?.clipPath?.map((path) => (
              <path
                key={path.id}
                fill={path?.fill ? path?.fill : 'none'}
                transform={path.transform}
                // "translate(.832 2.083)"
                d={path.d}
              />
            ))}
          </clipPath>
        </defs>
      )}
    </Svg>
  ) : (
    <span>Invalid</span>
  );
};

export default Icon;
