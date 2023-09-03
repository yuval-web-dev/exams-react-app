import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { FaReact } from "react-icons/fa"; // Import the React icon

const SiteFooter = () => (
  <Navbar
    fixed="bottom"
    bg="light"
    variant="light"
    className="justify-content-center">
    <Navbar.Text className="text-center text-muted small">
      Powered by <FaReact size={18} /> React
      <br />
      &copy; 2023 Yuval Rotem. All Rights Reserved.
    </Navbar.Text>
  </Navbar>
);

export default SiteFooter;
