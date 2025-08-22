import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link to="/" className="link-light text-descoration-none">
            WeTalk
          </Link>
        </h2>

        <span className="text-warning">Logged in as Shivansh</span>
        <Nav>
          {/*Stack allows us to align the stuff either horizontally or vertically but by default vertically*/}
          <Stack direction="horizontal" gap={3}>
            <Link to="/login" className="link-light text-descoration-none">
              Login
            </Link>
            <Link to="/register" className="link-light text-descoration-none">
              Register
            </Link>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
