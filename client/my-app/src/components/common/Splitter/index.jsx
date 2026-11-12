import './index.css'

const Splitter = ({
    startDragging,
    onPointerMove,
    stopDragging
}) => {
    return (
        <div
            className="workspace-splitter"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize workspace panels"
            onPointerDown={startDragging}
            onPointerMove={onPointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onLostPointerCapture={stopDragging}
        />
    );
};

export default Splitter;