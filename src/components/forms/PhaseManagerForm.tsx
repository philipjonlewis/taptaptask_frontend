import React, { useState } from "react";
import { Reorder, AnimatePresence, useDragControls } from "framer-motion";

const PhaseManagerForm = () => {
  const [items, setItems] = useState([0, 1, 2, 3]);
  console.log(items);
  const controls = useDragControls();

  return (
    <div className="phase-management-container">
      <div className="title-container">
        <p>Phase Manager</p>
      </div>

      <div className="interactive-phase-container">
        <Reorder.Group values={items} onReorder={setItems} axis="y">
          {items.map((item) => (
            <Reorder.Item
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              key={item}
              value={item}
              //   dragListener={false}
              //   dragControls={controls}
            >
              <span> {item}</span>
              {/* <div
                className="reorder-handle"
                onPointerDown={(e) => controls.start(e)}
              /> */}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default PhaseManagerForm;
