import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import ShareIcon from '@mui/icons-material/Share';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from 'react';
import ShareSiteModal from '../share-site-modal/ShareSiteModal';
import { TopBarProps } from "./TopBar.props";

const TopBar = (props: TopBarProps): JSX.Element => {
    const { onNewGameClick } = props;

    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    const handleShareModalClose = () => {
        setIsShareModalOpen(prev => !prev);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" sx={{ boxShadow: 1 }}>
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <ScoreboardIcon color="primary" />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Scoreboard
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleShareModalClose}
                    >
                        <ShareIcon color="primary" />
                    </IconButton>
                    <Button variant="outlined" color="primary" onClick={onNewGameClick}>New Game</Button>
                </Toolbar>
            </AppBar>


            <ShareSiteModal open={isShareModalOpen}
                onClose={handleShareModalClose} />
        </Box >
    );
}

export default TopBar;
