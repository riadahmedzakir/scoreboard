
import { useDraggable } from '@dnd-kit/core';

const Draggable = (props: any): JSX.Element => {
    const Element = props.element || 'div';

    const { attributes, listeners, setNodeRef } = useDraggable({ id: props.id, });

    return (
        <Element ref={setNodeRef} {...listeners} {...attributes}>
            {props.children}
        </Element>
    );
}

export default Draggable;