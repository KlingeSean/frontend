import "../css/Footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <p>
          &copy; {currentYear} Created by{" "}
          <a href="https://www.instagram.com/seanklingemusic/">Sean Klinge</a>{" "}
          and powered by <a href="https://www.themoviedb.org">The Movie Db</a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
