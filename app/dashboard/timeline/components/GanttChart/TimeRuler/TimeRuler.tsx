import { FC, useContext } from "react";
import TimeRuleRow from "./TimeRuleRow";
import { gridViewData } from "../contexts/gridViewData";
interface ITimeRulerProps {}

export const TimeRuler: FC<ITimeRulerProps> = (props) => {
  const gridData = useContext(gridViewData);
  return (
    <>
      <gridViewData.Provider value = {{...gridData,atom_coloring:['bg-blue-50'],atom_height:30}}>
        <TimeRuleRow className="rounded-t-3xl"></TimeRuleRow>
        <TimeRuleRow></TimeRuleRow>
      </gridViewData.Provider>
    </>
  );
};
