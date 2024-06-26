import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { Avatar, Chip } from '@mui/material';
import { PlayerChipProps } from './PlayerChip.props';

const PlayerChip = (props: PlayerChipProps): JSX.Element => {
    const { item } = props;

    const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: item?.id ?? 0 });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Chip
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            avatar={
                <Avatar>{item?.playerName[0]}</Avatar>
            }
            deleteIcon={<OpenWithIcon sx={{ fontSize: '16px !important' }} />}
            onDelete={() => { }}
            label={item?.playerName}
            variant="outlined"
            color='success'
        />
    );
}

export default PlayerChip;