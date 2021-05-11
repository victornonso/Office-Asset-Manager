import React, { useState, useEffect, useMemo, useRef } from "react";
import AssetDataService from "../services/AssetService";
import AddAsset from  "./AddAsset"
import { useTable } from "react-table";

const AssetList = (props) => {
  const [assets, setAssets] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const assetsRef = useRef();

  assetsRef.current = assets;

  useEffect(() => {
    retrieveAssets();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveAssets = () => {
    AssetDataService.getAll()
      .then((response) => {
        setAssets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveAssets();
  };

  
  const removeAllAssets = () => {
    AssetDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    AssetDataService.findByTitle(searchTitle)
      .then((response) => {
        setAssets(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openAsset = (rowIndex) => {
    const id = assetsRef.current[rowIndex].id;

    props.history.push("/assets/" + id);
  };

  const deleteAsset = (rowIndex) => {
    const id = assetsRef.current[rowIndex].id;

    AssetDataService.remove(id)
      .then((response) => {
        props.history.push("/asset");

        let newAssets = [...assetsRef.current];
        newAssets.splice(rowIndex, 1);

        setAssets(newAssets);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: "s/n",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      // {
      // //   Header: "Status",
      // //   accessor: "published",
      // //   Cell: (props) => {
      // //     return props.value ? "Published" : "Pending";
      // //   },
      // // },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openAsset(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteAsset(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: assets,
  });


  return (
     <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
          <div className="container">
              <div className="row">
                <div className="col-md-5">
                   <button className="btn btn-sm btn-danger" onClick={removeAllAssets}>
                     Remove All
                   </button>
                </div>
                
              </div>
          </div>
      
    </div>
  );
};

export default AssetList;