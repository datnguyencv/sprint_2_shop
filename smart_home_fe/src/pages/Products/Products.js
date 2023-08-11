import React, {useEffect} from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import "./Products.css";
import {Field, Form, Formik} from "formik";
import *as Yup from "yup";

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?`
  );
  useEffect(() => {
    document.title = "Loại sản phẩm"; // Thay đổi title
    window.scrollTo(0,0)
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

  const searchByCategoryValidationSchema = Yup.object().shape({
    searchByCategory: Yup.string(),
  });


  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Danh mục sản phẩm</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Tìm kiếm theo giá</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sắp xếp</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Giá (Thấp nhất)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Giá (Cao nhất)</label>
          </div>
        </div>
        <Formik
            initialValues={{ searchByName: "", searchByCategory: "" }}
            onSubmit={() => {}}
            validationSchema={searchByNameValidationSchema}
        >
          {({ handleChange, handleBlur, values }) => (
              <Form>
                <div className="filterItem">
                  <h2>Tìm kiếm theo tên</h2>
                  <div className="inputItem">
                    <Field
                        type="text"
                        name="searchByName"
                        placeholder="Nhập tên sản phẩm"
                    />
                    <button type="submit">Tìm kiếm</button>
                  </div>
                </div>
              </Form>
          )}
        </Formik>
        <Formik
            initialValues={{ searchByCategory: "" }}
            onSubmit={() => {}}
            validationSchema={searchByCategoryValidationSchema}
        >
          {({ handleChange, handleBlur, values }) => (
              <Form>
                <div className="filterItem">
                  <h2>Tìm kiếm theo loại</h2>
                  <div className="inputItem">
                    <Field name="searchByCategory" as="select">
                      <option value="">Chọn loại sản phẩm</option>
                      {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                      ))}
                    </Field>
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
          src="/img/banner.jpg" style={{height:"25vw"}}
          alt=""
        />
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>
      </div>

    </div>
  );
};

export default Products;
