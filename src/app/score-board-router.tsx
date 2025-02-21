import { Route, Routes } from "react-router-dom";
import CallBridgeScoreBoardRoot from "./components/call-bridge-score-board/container/CallBridgeScoreBoardRoot";
import ScoreBoardRoot from "./components/score-board/ScoreBoardRoot";

const ScoreBoardRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ScoreBoardRoot />} />
            <Route path="/call-bridge" element={<CallBridgeScoreBoardRoot />} />
        </Routes>
    );
};

export default ScoreBoardRouter;