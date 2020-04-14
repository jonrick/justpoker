import React, { useState } from "react";
import classnames from "classnames";
import Hand from "./Hand";
import PlayerStack from "./PlayerStack";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "9vw",
    height: "12vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  winner: {
    "&:before": {
      zIndex: -1,
      position: "absolute",
      content: '""',
      top: "-8%",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      boxShadow: `0px 0px 10px 20px rgba(200,200,235,0.8)`,
      backgroundColor: `rgba(200,200,235,0.8)`,
      "-webkit-animation": "$scale 1s infinite ease-in-out",
      animation: "$scale 1s infinite ease-in-out",
    },
  },
  toAct: {
    "&:before": {
      zIndex: -1,
      position: "absolute",
      content: '""',
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      boxShadow: `0px 0px 2px 10px rgba(0,236,255,1)`,
      backgroundColor: `rgba(0,236,255,0.7)`,
      "-webkit-animation": "$beacon 1.4s infinite linear",
      animation: "$beacon 1.4s infinite linear",
    },
  },
  "@keyframes scale": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  "@keyframes beacon": {
    "0%": {
      transform: "scale(.1)",
      opacity: 1,
    },
    "70%": {
      transform: "scale(1.6)",
      opacity: 0,
    },
    "100%": {
      opacity: 0,
    },
  },
}));

function Player(props) {
  const classes = useStyles();
  const { className, style } = props;
  const { stack, hand, name, toAct, hero, winner, button, hidden, folded } = props.player;

  return (
    <div
      className={classnames(classes.root, className, {
        [classes.toAct]: toAct,
        [classes.winner]: winner,
      })}
      style={style}
    >
      <Hand hand={hand} hidden={hidden} folded={folded}/>
      <PlayerStack name={name} stack={stack} button={button} />
    </div>
  );
}

export default Player;
