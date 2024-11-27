import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#000000", color: "#FFFFFF" }}
        className="z-10 py-6 px-4 md:px-12 text-center"
      >
        All Rights Reserved © TrendMart {moment().format("YYYY")}
      </footer>
    </Fragment>
  );
};
// <!-- Developed & Designed By Moeez, Laiba, Roman/> -->
export default Footer;
