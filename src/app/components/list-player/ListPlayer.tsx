import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges, } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Draggable from './Draggable';
import { ListPlayerProps } from "./ListPlayer.props";
import PlayerChip from './PlayerChip';
import { PlayChipItem } from './PlayerChip.props';

const ListPlayer = (props: ListPlayerProps): JSX.Element => {
    const { players, refresh } = props;

    const [isDragging, setIsDragging] = useState(false);
    const [activePlayer, setActivePlayer] = useState<PlayChipItem | undefined>(undefined);
    const [items, setItems] = useState<Array<PlayChipItem>>([]);
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

    const handleDragStart = (event: any) => {
        const { active } = event;
        const activePlayer = items.find(x => x.id === active.id);

        setIsDragging(true);
        setActivePlayer(activePlayer);
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                const newArray = arrayMove(items, oldIndex, newIndex);
                const config = JSON.parse(localStorage.getItem('board-config') ?? '{}');

                config.Players = newArray.map((x, index) => ({
                    Id: x.playerId,
                    Name: x.playerName,
                    Order: index + 1,
                    Status: x.playerStatus
                }));

                localStorage.setItem('board-config', JSON.stringify(config));

                return newArray
            });


            refresh();
        }

        setIsDragging(false);
    }

    useEffect(() => {
        const item = players.map(x => ({
            id: x.Order,
            playerId: x.Id,
            playerName: x.Name,
            playerStatus: x.Status
        }));

        setItems(item);
    }, [players]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
            >
                <Grid container gap={1}>
                    {
                        items.map(x => (
                            <Grid item key={x.id}>
                                <Draggable key={x.id} id={x.id}>
                                    <PlayerChip key={x.id} item={x} />
                                </Draggable>
                            </Grid>
                        ))
                    }
                </Grid>
            </SortableContext>

            <DragOverlay modifiers={[restrictToWindowEdges]}>
                {
                    isDragging ? (
                        <Draggable key={activePlayer?.id} id={activePlayer?.id}>
                            <PlayerChip key={activePlayer?.id} item={activePlayer} />
                        </Draggable>
                    ) : null
                }
            </DragOverlay>
        </DndContext>
    )
}

export default ListPlayer;

