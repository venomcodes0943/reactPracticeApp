import React from "react";
import { ThemeController, ProfileManager } from "../../index";
import Container from "../Container/Container";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="pt-2">
      <Container>
        <div className="flex-1">
          <Link
            to={"/"}
            className="btn btn-ghost bg-transparent hover:bg-transparent text-xl"
          >
            DayToday
          </Link>
        </div>
        <ThemeController />
        <div className="px-1">
          <ProfileManager />
        </div>
      </Container>
    </div>
  );
};

export default Header;
