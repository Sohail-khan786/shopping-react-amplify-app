import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getProduct as GetProduct } from "../../graphql/queries";
import Layout from "../../Layout/Layout";
import {
  createReview as CreateReview,
  updateReview as UpdateReview,
} from "../../graphql/mutations";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const initialState = {
  title: "",
  description: "",
  product: {},
};

function ProductDetails() {
  let { name, productId } = useParams();
  const [productDetails, setproductDetails] = useState({});
  const [reviews, setreviews] = useState([]);

  const [reviewFrom, setreviewFrom] = useState(initialState);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [reviewID, setreviewID] = useState("");

  const [editClicked, seteditClicked] = useState(false);

  const userName = useSelector((state) => state.user.username);

  useEffect(() => {
    getProductDataById();
  }, []);

  const getProductDataById = async () => {
    try {
      const productData = await API.graphql(
        graphqlOperation(GetProduct, { id: productId })
      );
      console.log("Product Details :", productData);
      setproductDetails(productData.data.getProduct);
      setreviewFrom({ ...reviewFrom, product: productDetails });
      setreviews(productData.data.getProduct.reviews.items);
      console.log(
        "Product Reviews :",
        productData.data.getProduct.reviews.items
      );
    } catch (err) {
      console.log("error fetching Product Details...", err);
    }
  };

  const submitReview = async () => {
    if (editClicked) {
      let reviewToUpdate = {
        id: reviewID,
        title: title,
        description: description,
      };

      let index = reviews.findIndex((r) => r.id === reviewID);
      console.log(index);

      try {
        const updatedReviewData = await API.graphql(
          graphqlOperation(UpdateReview, { input: reviewToUpdate })
        );
        console.log("review updated!");
        console.log(updatedReviewData.data.updateReview);
        //setreviews([...reviews, reviewData.data.createReview]);
        seteditClicked(false);
        let dummyArray = reviews;
        dummyArray.splice(index, 1, updatedReviewData.data.updateReview);
        setreviews([...dummyArray]);
        clearForm();

        toast.info(`Review Updated`, {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } catch (err) {
        console.log("error creating review...", err);
      }
    } else {
      let reviewToAdd = {
        title: title,
        description: description,
        reviewProductId: productId,
      };
      console.log("review to Add");
      console.log(reviewToAdd);

      try {
        const reviewData = await API.graphql(
          graphqlOperation(CreateReview, { input: reviewToAdd })
        );
        console.log("review created!");
        console.log(reviewData);
        setreviews([...reviews, reviewData.data.createReview]);
        clearForm();

        toast.success(`Review Added`, {
          autoClose: 3000,
          hideProgressBar: true,
        });
      } catch (err) {
        console.log("error creating review...", err);
      }
    }
  };

  const clearForm = () => {
    settitle("");
    setdescription("");
  };

  const editReview = (data) => {
    console.log("edit review clicked");
    console.log(data);

    settitle(data.title);
    setdescription(data.description);
    setreviewID(data.id);

    seteditClicked(true);
  };

  return (
    <div>
      <Layout />

      <div className="card ">
        <div className="card-body ">
          <h5 className="card-title">{`Name : ${productDetails.name}`}</h5>
          <p className="card-text">{`Price : ${productDetails.price}`}</p>
          <p className="card-text">{`Description : ${productDetails.description}`}</p>
          <br></br>
          <br></br>

          <p className="card-text">Add/Edit Review From Below</p>
          <div className="form-row">
            <div className="form-group col-lg-4 col-md-4 col-sm-12 ">
              <label> Title </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              ></input>
              <br></br>
            </div>

            <div className="form-group col-lg-4 col-md-4 col-sm-12 ">
              <label> Description </label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></input>
              <br></br>
            </div>
          </div>
          <div className="form-row">
            <div className="col-12 text-right">
              <div
                class="btn btn-success marginAllSides"
                onClick={submitReview}
              >
                Submit
              </div>
              <div class="btn btn-danger marginAllSides" onClick={clearForm}>
                Cancel
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          <p className="card-text">Below Are Some User Reviews :</p>
          <ol>
            {reviews.map((review) => (
              <li
                className="card-text marginAllSides paddingAllSides"
                key={review.id}
              >
                {`${review.description}`}
                {userName == review.createdBy && (
                  <div
                    class="btn btn-primary marginAllSides "
                    onClick={() => editReview(review)}
                  >
                    Edit
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
