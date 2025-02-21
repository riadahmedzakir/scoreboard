import MenuIcon from '@mui/icons-material/Menu';
import CasinoIcon from '@mui/icons-material/Casino';
import ShareIcon from '@mui/icons-material/Share';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { useState } from 'react';
import ShareSiteModal from '../share-site-modal/ShareSiteModal';
import { TopBarProps } from "./TopBar.props";
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = (props: TopBarProps): JSX.Element => {
    const { onNewGameClick } = props;

    const navigate = useNavigate();

    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const handleShareModalClose = () => {
        setIsShareModalOpen(prev => !prev);
    }

    const toggleDrawer = (value: boolean) => () => {
        setIsDrawerOpen(value);
    };

    const handleRoute = (value: string) => {
        navigate(`${value}`, { replace: true });
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
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon color="primary" />
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

            <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                        <ListItem disablePadding onClick={() => { handleRoute('/') }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <CasinoIcon color='primary' />
                                </ListItemIcon>
                                <ListItemText primary={'Generic Scoreboard'} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding onClick={() => { handleRoute('/call-bridge') }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EnergySavingsLeafIcon color='primary' />
                                </ListItemIcon>
                                <ListItemText primary={'Call bridge'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box >
    );
}

export default TopBar;
