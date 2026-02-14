import { CSSProperties } from "react";
import { getCategoryColor } from "../../helpers/categoryHelper";
import { ProgressBarProps } from "../../types/point";

const ProgressBar = ({ category, percentage }: ProgressBarProps) => {
  const categoryColor = getCategoryColor(category.title);

  const style = {
    "--progress-color": categoryColor,
  } as CSSProperties;

  return (
    <div className="progress-bar flex items-center gap-3" style={style}>
      <div className="min-w-[130px] text-sm font-semibold color-text">
        {category.title}
      </div>

      <div className="flex-1">
        <div className="progress-bar__track">
          <div
            className="progress-bar__fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="min-w-[42px] text-sm font-semibold color-text text-right">
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
