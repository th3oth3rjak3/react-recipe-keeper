import './footer.css';
import Container from 'react-bootstrap/Container';

function Footer() {
    return (
        <footer id="footer" className="footer mt-auto py-3">
            <Container>
                <span className="text-muted">&copy; Jake Hathaway - 2022</span>
            </Container>
        </footer>

    );
}

export default Footer;