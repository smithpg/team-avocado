import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import NameCard from "../../components/CustomerNameCard";
import SimpleMenu from "../../components/MenuButton";
import { layout, colors } from "../../themes/theme";
import { useContext } from "react";
import AuthContext from "../../store/createContext";
import useResource from "../../hooks/useResource";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: ${colors.background};
  transition: all 100ms;
  padding-top: calc(${layout.navHeight} + 50px);

  padding-bottom: 100px;

  nav span {
    margin-right: ${layout.spacing(4)};
  }
`;

function CustomerPage({ customerId }) {
  // Determine whether logged in user owns this
  // profile page
  const { user } = useContext(AuthContext),
    userIsOwner = user && user.id === customerId;

  // Get the ID'd Customer document from API
  const { resource: customer } = useResource(
    `customer/${customerId}`,
    user.token
  );

  return (
    <PageContainer>
      <Navbar
        links={[
          {
            link: "/browse/chefs",
            text: "Browse Chefs",
          },
        ]}
      />
      {customer ? (
        <NameCard customer={customer} userIsOwner={userIsOwner} />
      ) : (
        "Loading..."
      )}
    </PageContainer>
  );
}

export default CustomerPage;
