import Container from '../components/Container';
import {useParams} from 'react-router-dom';

const Book = () => {

    const params = useParams();

    return (<Container>
        <pre>{JSON.stringify(params,0,1)}</pre>
    </Container>)
}

export default Book;