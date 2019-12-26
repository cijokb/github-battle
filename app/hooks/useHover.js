import React from 'react'

const useHover = () => {
    const [hovering, setHovering] = React.useState(false);
    const onMouseOut = () => setHovering(false);
    const onMouseOver = () => setHovering(true);
    return [hovering, {
        onMouseOver, onMouseOut
    }];
}

export default useHover;
