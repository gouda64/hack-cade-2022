import * as React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
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
          update: update,
        },
      },
      gameOver: false,
    };
  }

  render() {
    const { initialize, game } = this.state;
    return (
      <div className="columns">
        <IonPhaser
          className="column has-text-center"
          game={game}
          initialize={initialize}
        />
      </div>
    );
  }
}

export function Head() {
  return (
    <>
      <title>Edit Your Page's Title! | It's easy.</title>;
      <meta name="description" content="Edit your page's description here!" />
    </>
  );
}
