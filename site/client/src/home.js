import React from "react";
import { useHistory } from "react-router-dom";

import "./App.css";

export default function Home() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/signup";
    history.push(path);
  };

  return (
    <>
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h2 class="display-4" style={{ fontFamily: "Abril Fatface" }}>
          Get smarter about what <br /> matters to you.
        </h2>
        <br />
        <h4>
          Select what you're into. We'll help you find great things to read.
        </h4>
        <br />

        <Tiles name="Future" />
        <Tiles name="Technology" />
        <Tiles name="Physics" />
        <Tiles name="Health" />
        <Tiles name="Mathematics" />
        <Tiles name="Computing" />

        <br />

        <Tiles name="Culture" />
        <Tiles name="Neuroscience" />
        <Tiles name="LGBTQ" />
      </div>

      <div class="text-center">
        <button
          style={{ backgroundColor: "#55b0c9", border: "none" }}
          class="btn btn-primary btn-lg"
          onClick={routeChange}
        >
          Get Started
        </button>
        <br></br>
        <br></br>
        <span>
          Already have an account.{" "}
          <a href="/signin" style={{ color: "#55b0c9" }}>
            Sign in
          </a>
          .
        </span>
      </div>
      <br />
      <br />
      <div class="ml-5">
        <h1 class="display-4" style={{ fontFamily: "Abril Fatface" }}>
          No Ads. No problems.
        </h1>
        <span>
          Your privacy stays yours. We don’t sell your data or target you with
          ads. Ever.
        </span>
      </div>
    </>
  );
}

function Tiles(props) {
  return (
    <button
      style={{
        border: "none",
        borderRadius: "20px",
        padding: "3px 5px",
        margin: "5px",
      }}
    >
      <button
        style={{
          border: "none",
          borderRadius: "50%",
          fontSize: "17px",
          padding: "2px 10px",
          color: "white",
          alignContent: "left",
          margin: "1px",
          backgroundColor: "black",
        }}
      >
        #
      </button>
      <span style={{ fontSize: "20px", margin: "5px" }}>{props.name}</span>
    </button>
  );
}
