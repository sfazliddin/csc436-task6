import Container from "../components/Container";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const Book = () => {
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [book, setBook] = useState({});

  const getData = async () => {
    const url = `https://api.matgargano.com/api/books/${params["id"]}`;
    setLoading(true);
    setError(false);
    try {
      const request = await fetch(url);
      const response = await request.json();
      setBook(response);
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {!error && loading && (
        <div className="max-w-[230px]">
          <Skeleton count="10" />
        </div>
      )}
      {!error && !loading && (
        <>
          <Link
            style={{
              backgroundColor: "lightblue",
              borderRadius: "10px",
              padding: "10px",
            }}
            to={"/books"}
          >
            Go Back
          </Link>
          <br />
          <br />
          <div style={{display:'flex', }}>
            <div style={{float:'left', width:'100%', flex:'10%'}}>
              <img src={book.imageURL} alt={book.title} />

            </div>
            <div style={{float:'left', width:'50%', flex:'50%'}}>
          <h1>Book Title: <b> {book.title}</b> </h1>
          <p>Author: <b>{book.author}</b></p>
          <p>Published By: <b>{book.publisher}</b></p>
          <p>Year Published: <b>{book.year}</b></p>
          <p>Number of Pages: <b>{book.pages}</b></p>
          <p>Country of Origin: <b> {book.country}</b></p>

            </div>
          </div>

          
        </>
      )}
    </Container>
  );
};

export default Book;
