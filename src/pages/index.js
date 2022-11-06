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
        <Link to="play" className="button is-tertiary is-large m-5">
          Yessir!
        </Link>
      </div>
    </main>
  );
}

export function Head() {
  return (
    <>
      <title>Edit Your Page's Title! | It's easy.</title>;
      <meta name="description" content="Edit your page's description here!" />
    </>
  );
}
