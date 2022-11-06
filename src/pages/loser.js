import * as React from "react";
import { Link } from "gatsby";
import axios from "axios";

import "../styles/loser/_all.scss";

const comments = [
  "Even my grandma could beat you.",
  "Tetris user? More like Tetris loser.",
  "I've lost all hopes on you.",
  "You'll never win! MWAHAHAHAHA!!!!!!",
  "You weren't trying, right?",
  "You lost? This has to be a joke!",
  "Let me tell you a joke: you exist.",
  "You wanted to win? Hahahahahaha...",
  "HAHA! IN YOUR FACE.",
  "¯_( ͡° ͜ʖ ͡°)_/¯",
  "( ͡° ͜ʖ ͡°)",
  "(☞ ͡° ͜ʖ ͡°)☞ Bruh.",
  "(☞ ͡° ͜ʖ ͡°)☞ Breh.",
  "Even my grandma could beat you.",
  "Tetris user? More like Tetris loser.",
  "I've lost all hopes on you.",
  "You'll never win! MWAHAHAHAHA!!!!!!",
  "You weren't trying, right?",
  "You lost? This has to be a joke!",
  "Let me tell you a joke: you exist.",
  "You wanted to win? Hahahahahaha...",
  "HAHA! IN YOUR FACE.",
  "Bruh.",
  "Breh.",
  "¯_( ͡° ͜ʖ ͡°)_/¯",
  "( ͡° ͜ʖ ͡°)",
  "Bruh.",
  "Breh.",
];

export default class LoserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      score: -1,
      phone: "",
    };
  }
  render() {
    return (
      <>
        <main className="hero is-halfheight">
          <div className="hero-body has-columns-vertical is-flex-direction-column has-text-centered is-justify-content-center is-align-items-center">
            <h1 className="title is-size-1 mx-5 px-5">
              {comments[Math.floor(Math.random() * comments.length)]}
            </h1>
            <Link to="/play" className="button is-primary is-large m-5">
              Try Again
            </Link>
          </div>
        </main>
        <section className="container-fluid columns is-justify-content-space-between align-items-space-between has-background-dark">
          <div className="column p-5">
            <table className="table has-text-centered is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <td>Player</td>
                  <td>Score</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="column p-5">
            <form>
              <h1 className="is-size-3 has-text-centered">
                Submit your score!
              </h1>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="tel"
                    placeholder="e.g. +12345671234"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export function Head() {
  return (
    <>
      <title>Losers Only | Tetris REMASTERED</title>;
      <meta
        name="description"
        content="Don't go here. You're better than this."
      />
      <meta
        name="keywords"
        content="tetris retro video-game gaming yessir disney nintendo artificial-intelligence voice-recognition"
      />
    </>
  );
}
/*onClick={(e) => axios.post("/api/add-score", {this.state}).then();
                  }*/
