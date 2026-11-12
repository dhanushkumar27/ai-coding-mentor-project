import { useRef, useState } from "react";

import PanelLayout from "../../../layouts/PanelLayout";

import LeftPanelHeader from '../LeftPanelHeader'
import LeftPanelBody from "../LeftPanelBody";
import LeftPanelFooter from '../LeftPanelFooter'


import Splitter from "../../common/Splitter";

import RightPanelHeader from "../RightPanelHeader";
import RightPanelBody from "../RightPanelBody";
import RightPanelFooter from "../RightPanelFooter";

import './index.css'

const MIN_LEFT_WIDTH = 35;
const MAX_LEFT_WIDTH = 65;

const WorkspaceBody = () => {
    const [leftWidth, setLeftWidth] = useState(50);

    const workspaceRef = useRef(null);
    const isDragging = useRef(false);

    const startDragging = (event) => {
        if (event.button !== 0) return;

        event.preventDefault();

        isDragging.current = true;

        event.currentTarget.setPointerCapture(event.pointerId);
    };

   
    const handlePointerMove = (event) => {
        if (!isDragging.current || !workspaceRef.current) {
            return;
        }

        const workspaceRect =
            workspaceRef.current.getBoundingClientRect();

        const relativeX = event.clientX - workspaceRect.left;

        const percentage =
            (relativeX / workspaceRect.width) * 100;

        const newLeftWidth = Math.min(
            MAX_LEFT_WIDTH,
            Math.max(MIN_LEFT_WIDTH, percentage)
        );

        setLeftWidth(newLeftWidth);
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    return (
        <div
            ref={workspaceRef}
            className="workspace-body"
            
        >

            <PanelLayout
                className="workspace-left-panel"
                header={<LeftPanelHeader />}
                footer={<LeftPanelFooter />}
                style={{
                    flex: `0 0 ${leftWidth}%`,
                    minWidth: 0
                }}
            >
                <LeftPanelBody />
            </PanelLayout>

            <Splitter
                startDragging={startDragging}
                onPointerMove={handlePointerMove}
                stopDragging={stopDragging}
            />

            <PanelLayout
                className="workspace-right-panel"
                header={<RightPanelHeader />}
                footer={<RightPanelFooter />}
                style={{
                    flex: 1,
                    minWidth: 0
                }}
            >
                <RightPanelBody />
            </PanelLayout>
            
        </div>
    );
};

export default WorkspaceBody;