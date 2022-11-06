import * as React from "react";
import { Link, navigate } from "gatsby";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

export default class NotFoundPage extends React.Component {
  componentDidMount() {
    navigate("/");
  }
  render() {
    return (
      <main style={pageStyles}>
        <h1 style={headingStyles}>Page not found</h1>
        <p style={paragraphStyles}>
          Sorry 😔, we couldn’t find what you were looking for.
          <br />
          <br />
          <Link to="/">Go home</Link>.
        </p>
      </main>
    );
  }
}
export function Head() {
  return (
    <>
      <title>Page Not Found | Tetris REMASTERED</title>
      <meta
        name="description"
        content="This page doesn't exist. Please visit our homepage."
      />
      <meta
        name="keywords"
        content="tetris, retro, video-game, gaming, yessir, disney, nintendo, artificial-intelligence, voice-recognition"
      />
    </>
  );
}
