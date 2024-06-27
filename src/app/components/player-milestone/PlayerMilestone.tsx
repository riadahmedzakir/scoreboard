import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useEffect, useState } from "react";
import PlayerStatus from "./../../enums/player-status.enum";
import { PlayerMilestoneProps } from "./PlayerMilestone.props";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

interface GraphItem {
    name: string;
    total: number;
    color: string;
}

const PlayerMilestone = (props: PlayerMilestoneProps): JSX.Element => {
    const { items, maxPoint, players } = props;

    const [graphItems, setGraphItems] = useState<Array<GraphItem>>([]);

    const sortAscending = (a: GraphItem, b: GraphItem) => a.total - b.total;

    const sortDescending = (a: GraphItem, b: GraphItem) => b.total - a.total;

    const handleSort = () => {
        if (graphItems[0].total > graphItems[graphItems.length - 1].total) {
            graphItems.sort(sortAscending);
        } else { graphItems.sort(sortDescending); }

        setGraphItems([...graphItems]);
    }

    useEffect(() => {
        const graphItems: Array<{ name: string; total: number; color: string; }> = [];

        Object.keys(items).forEach(x => {
            const player = players.find(player => player.Id == x);

            graphItems.push({
                name: player?.Name ?? '',
                total: items[x],
                color: player?.Status === PlayerStatus.BelowMaxPoint ? '#2e7d32' : player?.Status === PlayerStatus.MaxPoint ? '#ed6c02' : '#d32f2f'
            });
        });

        graphItems.sort(sortAscending);

        setGraphItems(graphItems);

    }, [items, players]);

    return (
        <Grid container gap={1} sx={{ mt: 2 }} justifyItems={"space-between"} alignItems={"center"}>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary sx={{ backgroundColor: '#faf7f0' }} expandIcon={<KeyboardArrowDownIcon />}>
                        <Typography width={'100%'} variant='h6' align='center'>
                            Sorted Score Visualizer
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#f5f5f5' }}>
                        <Grid container justifyContent={"space-between"} alignItems={"center"} gap={2}>
                            <Grid item xs={12} alignItems={'end'}>
                                <Grid container justifyContent={"end"}>
                                    <Grid item>
                                        <IconButton size='small' color='primary' onClick={handleSort}>
                                            <SwapHorizIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {
                                graphItems.map((item, index) => (
                                    <Grid item key={index}>
                                        <Typography variant="subtitle2" align="center">{item.name}</Typography>
                                        <Gauge
                                            width={100}
                                            height={100}
                                            value={item.total}
                                            startAngle={0}
                                            endAngle={360}
                                            valueMax={maxPoint}
                                            sx={{
                                                [`& .${gaugeClasses.valueText}`]: {
                                                    fontSize: 14,
                                                    transform: 'translate(0px, 0px)',
                                                },
                                                [`& .${gaugeClasses.valueArc}`]: {
                                                    fill: item.color,
                                                }
                                            }}
                                            text={
                                                ({ value, valueMax }) => `${value} / ${valueMax}`
                                            }
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

        </Grid>
    )
}

export default PlayerMilestone;