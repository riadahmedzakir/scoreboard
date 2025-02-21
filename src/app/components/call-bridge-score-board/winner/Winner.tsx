import { Dialog, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";
import { WinnerProps } from "./winner.props";

const Winner = (props: WinnerProps): JSX.Element => {
    const { open, onClose, winners } = props;

    const handleClose = (isClosed: boolean) => {
        onClose(isClosed);
    };

    return (
        <Dialog onClose={handleClose} open={open} scroll="paper"
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogContent
                sx={{
                    bgcolor: "#121212",
                    color: "#fff",
                    textAlign: "center",
                    position: "relative",
                    fontFamily: "'Rubik Spray Paint', cursive",
                    overflow: "hidden",
                }}
            >
                {open && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            zIndex: 1500,
                            pointerEvents: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ConfettiExplosion
                            force={0.9}
                            duration={3000}
                            particleCount={250}
                            width={window.innerWidth}
                        />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "300px",
                        height: "300px",
                        background: "radial-gradient(circle, rgba(250, 0, 250, 0.6) 0%, rgba(255, 253, 253, 0) 80%)",
                        filter: "blur(30px)",
                        transform: "translate(-50%, -50%)",
                    }}
                ></motion.div>

                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{
                        fontSize: "3rem",
                        color: "#ff00ff",
                        textShadow: "0px 0px 8px #ff00ff, 0px 0px 16px #ff00ff",
                    }}
                >
                    Congratulations 🎉🎉
                </motion.h1>

                <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                        fontSize: "1.3rem",
                        color: "#00ffcc",
                        textShadow: "0px 0px 6px #00ffcc",
                    }}
                >
                    Winners: {winners.join(', ')}
                </motion.p>
            </DialogContent>

        </Dialog>
    )
}

export default Winner;