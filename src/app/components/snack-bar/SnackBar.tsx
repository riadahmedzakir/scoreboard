import React, { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

interface SnackbarContextType {
    showSnackbar: (message: string, duration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; duration: number }>({
        open: false,
        message: "",
        duration: 1200,
    });

    const showSnackbar = (message: string, duration: number = 1200) => {
        setSnackbar({ open: true, message, duration });
    };

    const handleClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbar.open}
                onClose={handleClose}
                TransitionComponent={Slide}
                message={snackbar.message}
                autoHideDuration={snackbar.duration}
            />
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};
