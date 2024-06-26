import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { Box, Typography } from "@mui/material";
import { EmptyStateProps } from "./EmptyState.props";

const EmptyState = (props: EmptyStateProps): JSX.Element => {
    const { header, body } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            textAlign="center"
            p={3}
        >
            <Box mb={2}>
                <ContentPasteSearchIcon sx={{ fontSize: '60px' }} />
            </Box>
            <Typography variant="h5" component="h2" gutterBottom>
                {header}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                {body}
            </Typography>
        </Box>
    );
}

export default EmptyState;
