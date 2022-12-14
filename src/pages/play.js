import * as React from "react";
import { navigate } from "gatsby";
import Phaser from "phaser";
import loadable from "@loadable/component";
import { preload, create, update } from "../services/game";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../services/constants";

import "../styles/play/_all.scss";

export default class PlayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialize: true,
      game: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        type: Phaser.AUTO,
        scene: {
          init: preload,
          create: create,
          update: () => {
            if (update() && typeof window !== "undefined") navigate("/loser");
          },
        },
      },
      gameOver: false,
    };
  }

  render() {
    const { initialize, game } = this.state;
    const IonPhaser = loadable(() =>
      import("../../node_modules/@ion-phaser/react")
    );
    return (
      <div className="pt-5">
        {typeof window !== "undefined" && (
          <IonPhaser game={game} initialize={initialize} />
        )}
      </div>
    );
  }
}

export function Head() {
  return (
    <>
      <title>Tetris REMASTERED | Cool stuff in motion.</title>;
      <meta
        name="description"
        content="Play the best Tetris ever!!! AI-powered voice-control gameplay for EXTRA AWESOMENESS!!!!!!!"
      />
      <meta
        name="keywords"
        content="tetris retro video-game gaming yessir disney nintendo artificial-intelligence voice-recognition"
      />
    </>
  );
}
