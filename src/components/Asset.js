import React, { useState, useEffect } from "react";
import AssetDataService from "../services/AssetService";

const Asset = props => {
  const initialAssetState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentAsset, setcurrentAsset] = useState(initialAssetState);
  const [message, setMessage] = useState("");

  const getAsset = id => {
    AssetDataService.get(id)
      .then(response => {
        setcurrentAsset(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAsset(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentAsset({ ...currentAsset, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentAsset.id,
      title: currentAsset.title,
      description: currentAsset.description,
      published: status
    };

    AssetDataService.update(currentAsset.id, data)
      .then(response => {
        setcurrentAsset({ ...currentAsset, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateAsset = () => {
    AssetDataService.update(currentAsset.id, currentAsset)
      .then(response => {
        console.log(response.data);
        setMessage("The Asset was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteAsset = () => {
    AssetDataService.remove(currentAsset.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/assets");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {currentAsset ? (
      <div className="edit-form">
        <h4>Assets</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentAsset.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentAsset.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {currentAsset.published ? "Published" : "Pending"}
          </div>
        </form>

        {currentAsset.published ? (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(false)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(true)}
          >
            Publish
          </button>
        )}

        <button className="badge badge-danger mr-2" onClick={deleteAsset}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateAsset}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on an Asset..</p>
      </div>
    )}
  </div>
  );
};

export default Asset;