import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { Avatar, Chip } from '@mui/material';
import PlayerStatus from './../../enums/player-status.enum';
import { PlayerChipProps } from './PlayerChip.props';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const PlayerChip = (props: PlayerChipProps): JSX.Element => {
    const { item } = props;

    const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: item?.id ?? 0 });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const PlayerStatusColor = item?.playerStatus === PlayerStatus.BelowMaxPoint ? 'success' : item?.playerStatus === PlayerStatus.MaxPoint ? 'warning' : 'error';

    return (
        <Chip
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            avatar={
                <Avatar>
                    {
                        item?.playerStatus ===
                            PlayerStatus.BelowMaxPoint
                            ? <CheckCircleRoundedIcon color={PlayerStatusColor} /> :
                            item?.playerStatus === PlayerStatus.MaxPoint
                                ? <ErrorRoundedIcon color={PlayerStatusColor} /> :
                                <CancelRoundedIcon color={PlayerStatusColor} />
                    }
                </Avatar>
            }
            deleteIcon={<OpenWithIcon sx={{ fontSize: '16px !important' }} />}
            onDelete={() => { }}
            label={item?.playerName}
            variant="outlined"
            color={PlayerStatusColor}
        />
    );
}

export default PlayerChip;