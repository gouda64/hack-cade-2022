import React from "react";
import { Link } from "gatsby";

export default function IndexLayout({ children }) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="robots" content="index" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="author"
        content="Akshaj Jagarapu, Erica Dong, Ian Chang, Joseph Sardo, Tanner Shah"
      />
      <meta name="image" content="https://divakar.fitness/i.png" />
      <header className="navbar bg-light display-6 px-5 py-1 has-background-danger">
        <div className="container-fluid">
          <Link to="/">
            <strong className="is-size-4 pr-1 pt-1">Tetris</strong>{" "}
            <code className="is-size-6">REMASTERED</code>
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item button is-warning" to="/login">
              Login
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="p-3 container-fluid has-text-centered">
        <p>© {new Date().getFullYear()}. All rights not reserved. 😎</p>
      </footer>
    </>
  );
}
