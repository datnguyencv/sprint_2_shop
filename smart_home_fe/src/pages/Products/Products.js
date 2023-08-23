import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {setSearchTerm, setSortBy} from "../../redux/filterSlice";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const dispatch = useDispatch();

  const { data, loading, error } = useFetch("/productType?");
  useEffect(() => {
    document.title = "Loại sản phẩm"; // Thay đổi title
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
        isChecked
            ? [...selectedSubCats, value]
            : selectedSubCats.filter((item) => item !== value)
    );
  };

  const searchByNameValidationSchema = Yup.object().shape({
    searchByName: Yup.string(),
  });

  return (
      <div className="products">
        <div className="left">
        <div className="filterItem">
            <h4>Sắp xếp</h4>
            <div className="inputItem">
              <input
                  type="radio"
                  id="asc"
                  value="asc"
                  name="price"
                  onChange={() => dispatch(setSortBy("asc"))}
              />
              <label htmlFor="asc">Giá (Thấp nhất)</label>
            </div>
            <div className="inputItem">
              <input
                  type="radio"
                  id="desc"
                  value="desc"
                  name="price"
                  onChange={() => dispatch(setSortBy("desc"))}
              />
              <label htmlFor="desc">Giá (Cao nhất)</label>
            </div>
          </div>
          <Formik
              initialValues={{ searchByName: "" }}
              onSubmit={(values) => {
                dispatch(setSearchTerm(values.searchByName));
              }}
              validationSchema={searchByNameValidationSchema}
          >
            {({ handleChange, handleBlur, values, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="filterItem">
                    <h4>Tìm kiếm theo tên</h4>
                    <div className="inputItem">
                      <Field
                          type="text"
                          name="searchByName"
                          placeholder="Nhập tên sản phẩm"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.searchByName}
                      />
                      <button type="submit">Tìm kiếm</button>
                    </div>
                  </div>
                </Form>
            )}
          </Formik>
        </div>
        <div className="right">
          <img
              className="catImg"
              src="/img/banner.jpg"
              style={{ height: "25vw" }}
              alt=""
          />
          <List catId={catId} subCats={selectedSubCats} />
        </div>
      </div>
  );
};

export default Products;
