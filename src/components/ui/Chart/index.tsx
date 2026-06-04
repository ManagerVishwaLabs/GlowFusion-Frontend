import * as React from "react";
import * as RechartsPrimitive from "recharts";
import styles from "./Chart.module.css";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

type TooltipPayloadItem = {
  color?: string;
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  payload?: Record<string, unknown>;
};

type TooltipPayload = TooltipPayloadItem[];

type LegendPayloadItem = {
  value?: string | number;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
};

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType<Record<string, never>>;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={`${styles.chartContainer} ${className ?? ""}`}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme || itemConfig.color,
  );

  if (colorConfig.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof THEMES] ?? itemConfig.color;

    return color ? `  --color-${key}: ${color};` : "";
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipPayload;
  className?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: React.ReactNode;
  labelFormatter?: (
    value: React.ReactNode,
    payload: TooltipPayload,
  ) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    value: string | number,
    name: string,
    item: TooltipPayloadItem,
    index: number,
    payload: Record<string, unknown>,
  ) => React.ReactNode;
  color?: string;
  nameKey?: string;
  labelKey?: string;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  const tooltipPayload: TooltipPayload = React.useMemo(
    () => payload ?? [],
    [payload],
  );

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || tooltipPayload.length === 0) {
      return null;
    }

    const [item] = tooltipPayload;

    if (!item) {
      return null;
    }

    const key = `${labelKey || item.dataKey || item.name || "value"}`;

    const itemConfig = getPayloadConfigFromPayload(
      config,
      item as Record<string, unknown>,
      key,
    );

    const value =
      !labelKey && typeof label === "string"
        ? config[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={`${styles.tooltipLabel} ${labelClassName ?? ""}`}>
          {labelFormatter(value, tooltipPayload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return (
      <div className={`${styles.tooltipLabel} ${labelClassName ?? ""}`}>
        {value}
      </div>
    );
  }, [
    config,
    hideLabel,
    label,
    labelClassName,
    labelFormatter,
    labelKey,
    tooltipPayload,
  ]);

  if (!active || tooltipPayload.length === 0) {
    return null;
  }

  const nestLabel = tooltipPayload.length === 1 && indicator !== "dot";

  return (
    <div className={`${styles.tooltipContent} ${className ?? ""}`}>
      {!nestLabel ? tooltipLabel : null}

      <div className={styles.tooltipGrid}>
        {tooltipPayload.map((item: TooltipPayloadItem, index: number) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;

          const itemConfig = getPayloadConfigFromPayload(
            config,
            item as Record<string, unknown>,
            key,
          );

          const payloadData =
            typeof item.payload === "object" && item.payload !== null
              ? item.payload
              : {};

          const indicatorColor =
            color ??
            (typeof payloadData.fill === "string"
              ? payloadData.fill
              : undefined) ??
            item.color;

          return (
            <div
              key={String(item.dataKey ?? index)}
              className={`${styles.tooltipItem} ${
                indicator === "dot" ? styles.tooltipItemDot : ""
              }`}
            >
              {formatter && item.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, payloadData)
              ) : (
                <>
                  {itemConfig?.icon ? (
                    <itemConfig.icon />
                  ) : (
                    !hideIndicator && (
                      <div
                        className={`${styles.indicator} ${
                          styles[
                            `indicator${
                              indicator.charAt(0).toUpperCase() +
                              indicator.slice(1)
                            }`
                          ]
                        }`}
                        style={
                          {
                            "--color-bg": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )
                  )}

                  <div
                    className={`${styles.tooltipItemContent} ${
                      nestLabel ? styles.tooltipItemContentNest : ""
                    }`}
                  >
                    {nestLabel ? tooltipLabel : null}

                    <span className={styles.tooltipItemLabel}>
                      {itemConfig?.label || item.name}
                    </span>

                    {item.value !== undefined && (
                      <span className={styles.tooltipItemValue}>
                        {typeof item.value === "number"
                          ? item.value.toLocaleString()
                          : String(item.value)}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendContentProps extends React.ComponentProps<"div"> {
  hideIcon?: boolean;
  payload?: LegendPayloadItem[];
  verticalAlign?: "top" | "bottom";
  nameKey?: string;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  const legendPayload: LegendPayloadItem[] = payload ?? [];

  if (legendPayload.length === 0) {
    return null;
  }

  return (
    <div
      className={`${styles.legendContent} ${
        verticalAlign === "top" ? styles.legendTop : styles.legendBottom
      } ${className ?? ""}`}
    >
      {legendPayload.map((item: LegendPayloadItem, index: number) => {
        const key = `${nameKey || item.dataKey || "value"}`;

        const itemConfig = getPayloadConfigFromPayload(
          config,
          item as Record<string, unknown>,
          key,
        );

        return (
          <div key={String(item.value ?? index)} className={styles.legendItem}>
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className={styles.legendDot}
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}

            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: Record<string, unknown>,
  key: string,
) {
  const nestedPayload =
    typeof payload.payload === "object" && payload.payload !== null
      ? (payload.payload as Record<string, unknown>)
      : undefined;

  let configLabelKey = key;

  if (typeof payload[key] === "string") {
    configLabelKey = payload[key] as string;
  } else if (nestedPayload && typeof nestedPayload[key] === "string") {
    configLabelKey = nestedPayload[key] as string;
  }

  return config[configLabelKey] ?? config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
