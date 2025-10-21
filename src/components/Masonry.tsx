'use client';

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const get = () => {
      if (typeof window === 'undefined') return defaultValue;
      return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
    };

    setValue(get());

    const handler = () => setValue(get());
    queries.forEach(q => window.matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => window.matchMedia(q).removeEventListener('change', handler));
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onImageClick?: (item: Item) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  blurToFocus = true,
  colorShiftOnHover = false,
  onImageClick
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  useEffect(() => {
    if (!imagesReady) return;

    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [imagesReady]);

  const getItemStyle = (item: GridItem, index: number) => {
    return {
      left: `${item.x}px`,
      top: `${item.y}px`,
      width: `${item.w}px`,
      height: `${item.h}px`,
      transitionDelay: animationStarted ? '0s' : `${index * stagger}s`,
      transitionDuration: hoveredId !== null ? '0.4s' : `${duration}s`,
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'transform, opacity, filter'
    };
  };

  const getItemClasses = (item: GridItem) => {
    const isHovered = hoveredId === item.id;
    const hasHoveredItem = hoveredId !== null;
    const shouldShrink = hasHoveredItem && !isHovered;

    let classes = 'absolute transition-all cursor-pointer ';

    if (animationStarted) {
      classes += 'opacity-100 ';
    } else {
      classes += `opacity-0 ${animateFrom === 'bottom' ? 'translate-y-20' : ''} ${blurToFocus ? 'blur-sm' : ''} `;
    }

    // Add scale and z-index classes
    if (isHovered) {
      classes += 'scale-150 z-50 ';
    } else if (shouldShrink) {
      classes += 'scale-75 z-0 ';
    } else {
      classes += 'scale-100 z-10 ';
    }

    return classes;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {grid.map((item, index) => (
        <div
          key={item.id}
          className={getItemClasses(item)}
          style={getItemStyle(item, index)}
          onClick={() => onImageClick ? onImageClick(item) : window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="relative w-full h-full bg-cover bg-center rounded-xl overflow-hidden group border border-white/10 hover:border-white/40 transition-all duration-400"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {colorShiftOnHover && (
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-sky-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            )}

            {/* Dynamic overlay based on hover state */}
            <div className={`absolute inset-0 transition-all duration-400 ${
              hoveredId === item.id
                ? 'bg-black/5'
                : hoveredId !== null
                  ? 'bg-black/60'
                  : 'bg-black/20'
            }`} />

            {/* Enhanced brightness for hovered item */}
            {hoveredId === item.id && (
              <div className="absolute inset-0 bg-white/10 transition-all duration-400" />
            )}

            {/* Subtle gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-400 ${
              hoveredId === item.id ? 'opacity-20' : 'opacity-60'
            }`} />

          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;