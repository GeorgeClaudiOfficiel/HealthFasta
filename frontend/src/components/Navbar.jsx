import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Login</Link>
    <Link to="/patients">Patients</Link>
    <Link to="/reports">Reports</Link>
    <Link to="/settings">Settings</Link>
  </nav>
);

export default Navbar;
