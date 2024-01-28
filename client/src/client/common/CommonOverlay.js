import React, { useRef, useState } from 'react'
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CommonOverlay = ({
    placement,
    children,
    isShow,
    targetData
}) => {
    // console.log(".................placement 1",placement);
    console.log(".................placement 2",isShow);

    const [show, setShow] = useState(isShow);
//   const [target, setTarget] = useState(targetData);
let target = targetData;
  const ref = useRef(null);
  return (
    <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3">Popover bottom</Popover.Header>
          <Popover.Body>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Body>
        </Popover>
      </Overlay>
    // <Overlay  show={show} placement={placement}>
    //     {(props) => (
    //       <Tooltip id="overlay-example" {...props}>
    //         {children}
    //         My Tooltip
    //       </Tooltip>
    //     )}
    //   </Overlay>
  )
}

export default CommonOverlay

// target={target.current}