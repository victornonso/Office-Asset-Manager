import React, { useState } from "react";
import AssetDataService from "../services/AssetService";

const AddAsset= () => {
  const initialAssetState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [asset, setAsset] = useState(initialAssetState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAsset({ ...asset, [name]: value });
  };

  const saveAsset = () => {
    var data = {
      title: asset.title,
      description: asset.description
    };

    AssetDataService.create(data)
      .then(response => {
        setAsset({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newAsset= () => {
    setAsset(initialAssetState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newAsset}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="productname">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productname"
            required
            value={asset.productname}
            onChange={handleInputChange}
            name="productname"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            required
            value={asset.category}
            onChange={handleInputChange}
            name="category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="serialnumber">Serial Number</label>
          <input
            type="text"
            className="form-control"
            id="serialnumber"
            required
            value={asset.serialnumber}
            onChange={handleInputChange}
            name="serialnumber"
          />
        </div>
        <div className="form-group">
          <label htmlFor="vendor">Vendor</label>
          <input
            type="text"
            className="form-control"
            id="vendor"
            required
            value={asset.vendor}
            onChange={handleInputChange}
            name="vendor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            required
            value={asset.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dop">Date of Purchase</label>
          <input
            type="text"
            className="form-control"
            id="dop"
            required
            value={asset.dop}
            onChange={handleInputChange}
            name="dop"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mop">Mode of Payment</label>
          <input
            type="text"
            className="form-control"
            id="mop"
            required
            value={asset.mop}
            onChange={handleInputChange}
            name="mop"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirydate">Warranty Expiry Date</label>
          <input
            type="text"
            className="form-control"
            id="expirydate"
            required
            value={asset.expirydate}
            onChange={handleInputChange}
            name="expirydate"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={asset.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <button onClick={saveAsset} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddAsset;