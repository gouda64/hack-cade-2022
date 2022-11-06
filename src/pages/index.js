import * as React from "react";
import { Link } from "gatsby";

export default function IndexPage() {
  return (
    <main className="hero is-fullheight-with-navbar">
      <div className="hero-body has-columns-vertical is-flex-direction-column has-text-centered is-justify-content-center is-align-items-center">
        <h1 className="title is-size-1">
          Do you dare
          <br />
          to play?
        </h1>
        <Link to="/play" className="button is-primary is-large m-5">
          Yessir!
        </Link>
      </div>
    </main>
  );
}

export function Head() {
  return (
    <>
      <title>Tetris REMASTERED | Play if you dare...</title>;
      <meta
        name="description"
        content="BEST Tetris remake for Hack-cade 2022!! AI-powered voice-control gameplay for EXTRA AWESOMENESS!!!!!!!"
      />
      <meta
        name="keywords"
        content="tetris, retro, video-game, gaming, yessir, disney, nintendo, artificial-intelligence, voice-recognition"
      />
    </>
  );
}
