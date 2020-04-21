import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        width: "80%",
        display: "flex",
        justifyContent: "space-evenly",

    },
}));

function Hand(props) {
    const classes = useStyles();
    const { cards } = props.hand;

    return (
        <div className={classes.root}>
            {cards.map((c) => (
                <Card
                    suit={c.suit}
                    rank={c.rank}
                    hidden={c.hidden}
                    size="small"
                />
            ))}
        </div>
    );
}

export default Hand;
